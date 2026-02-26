"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import PhotoDropzone from "@/components/photo-dropzone";
import SearchableSelect from "@/components/searchable-select";
import {
    BRANDS, FUEL_TYPES, TRANSMISSIONS,
    getModelsForBrand, getYearsForModel, getPhasesForModel,
    isElectricOnlyBrand, isElectricModel,
} from "@/lib/mock-data";
import { Sparkles, ArrowLeft, Loader2, Zap, Info, Car } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function CreateAdPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<File[]>([]);
    const [formData, setFormData] = useState({
        brand: "", model: "", phase: "", year: "",
        mileage: "", price: "", fuel: "", transmission: "", notes: "",
    });

    // Derived state
    const models = useMemo(() => formData.brand ? getModelsForBrand(formData.brand) : [], [formData.brand]);
    const phases = useMemo(() => formData.brand && formData.model ? getPhasesForModel(formData.brand, formData.model) : [], [formData.brand, formData.model]);
    const years = useMemo(() => formData.brand && formData.model ? getYearsForModel(formData.brand, formData.model) : [], [formData.brand, formData.model]);
    const electricBrand = formData.brand ? isElectricOnlyBrand(formData.brand) : false;
    const electricModel = formData.brand && formData.model ? isElectricModel(formData.brand, formData.model) : false;
    const isElectric = electricBrand || electricModel || formData.fuel === "electrique";

    // Brand options with ⚡ for electric brands
    const brandOptions = useMemo(() => BRANDS.map((b) => ({
        value: b, label: b,
        icon: isElectricOnlyBrand(b) ? <Zap className="w-3 h-3 text-emerald-400" /> : <Car className="w-3 h-3 text-muted-foreground/40" />,
    })), []);

    // Model options with ⚡ for electric models
    const modelOptions = useMemo(() => models.map((m) => ({
        value: m.name, label: m.name,
        sublabel: `${m.yearStart}–${m.yearEnd === 2026 ? "auj." : m.yearEnd}`,
        icon: m.isElectric ? <Zap className="w-3 h-3 text-emerald-400" /> : undefined,
    })), [models]);

    // Auto-set for electric
    useEffect(() => {
        if (electricBrand || electricModel) {
            setFormData((p) => ({ ...p, fuel: "electrique", transmission: "automatique" }));
        }
    }, [electricBrand, electricModel]);

    useEffect(() => {
        if (formData.fuel === "electrique") {
            setFormData((p) => ({ ...p, transmission: "automatique" }));
        }
    }, [formData.fuel]);

    const updateField = (field: string, value: string) => {
        setFormData((prev) => {
            const u = { ...prev, [field]: value };
            if (field === "brand") {
                u.model = ""; u.phase = ""; u.year = "";
                if (!isElectricOnlyBrand(value)) {
                    if (prev.fuel === "electrique" && isElectricModel(prev.brand, prev.model)) u.fuel = "";
                }
            }
            if (field === "model") {
                u.phase = ""; u.year = "";
                if (isElectricModel(u.brand, value)) {
                    u.fuel = "electrique"; u.transmission = "automatique";
                } else if (prev.model && isElectricModel(u.brand, prev.model) && !isElectricOnlyBrand(u.brand)) {
                    u.fuel = ""; u.transmission = "";
                }
            }
            return u;
        });
    };

    const handleGenerate = async () => {
        if (!formData.brand || !formData.model || !formData.year) {
            toast.error("Remplissez au minimum la marque, le modèle et l'année.");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/generate-car-description", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, images: images.map((f) => f.name) }),
            });
            const result = await res.json();
            if (result.success) {
                sessionStorage.setItem("autoad-result", JSON.stringify({ ...result.data, vehicle: formData, imageCount: images.length }));
                toast.success("Annonce générée !");
                router.push("/dashboard/result");
            } else toast.error("Erreur lors de la génération.");
        } catch { toast.error("Erreur de connexion."); }
        finally { setLoading(false); }
    };

    const inputCls = "h-10 text-sm bg-white/[0.02] border-border/40 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 rounded-xl transition-all placeholder:text-muted-foreground/25";
    const selectCls = "h-10 text-sm bg-white/[0.02] border-border/40 rounded-xl [&>span]:text-sm";
    const labelCls = "text-[11px] text-muted-foreground/70 uppercase tracking-wider font-medium";

    return (
        <div className="max-w-2xl mx-auto animate-fade-up pb-16">
            {/* Header */}
            <div className="flex items-center gap-4 pt-2 lg:pt-8 mb-10">
                <Link href="/dashboard">
                    <button className="w-9 h-9 rounded-xl border border-border/40 bg-white/[0.02] flex items-center justify-center hover:bg-white/[0.05] hover:border-border/60 transition-all duration-200">
                        <ArrowLeft className="w-4 h-4 text-muted-foreground" />
                    </button>
                </Link>
                <div>
                    <p className="text-[10px] text-primary/60 uppercase tracking-[0.2em] font-semibold">Nouvelle annonce</p>
                    <h1 className="text-2xl font-bold tracking-tight mt-0.5 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Créer une annonce</h1>
                </div>
            </div>

            <div className="space-y-8">
                {/* ─── Photos ─── */}
                <section className="animate-fade-up" style={{ animationDelay: "50ms" }}>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-4 rounded-full gradient-primary" />
                        <h2 className="text-[11px] text-muted-foreground/70 uppercase tracking-[0.15em] font-semibold">Photos du véhicule</h2>
                    </div>
                    <PhotoDropzone images={images} onImagesChange={setImages} />
                </section>

                {/* ─── Vehicle Info ─── */}
                <section className="animate-fade-up" style={{ animationDelay: "100ms" }}>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-4 rounded-full gradient-primary" />
                        <h2 className="text-[11px] text-muted-foreground/70 uppercase tracking-[0.15em] font-semibold">Caractéristiques</h2>
                    </div>
                    <div className="rounded-2xl border border-border/30 bg-gradient-to-b from-white/[0.02] to-transparent p-5 space-y-5">
                        {/* Brand + Model — Searchable */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className={labelCls}>Marque *</Label>
                                <SearchableSelect
                                    id="brand"
                                    options={brandOptions}
                                    value={formData.brand}
                                    onValueChange={(v) => updateField("brand", v)}
                                    placeholder="Tapez pour rechercher..."
                                    searchPlaceholder="Rechercher une marque..."
                                    emptyMessage="Marque introuvable."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className={labelCls}>Modèle *</Label>
                                <SearchableSelect
                                    id="model"
                                    options={modelOptions}
                                    value={formData.model}
                                    onValueChange={(v) => updateField("model", v)}
                                    placeholder={formData.brand ? "Tapez pour rechercher..." : "Choisir une marque d'abord"}
                                    searchPlaceholder="Rechercher un modèle..."
                                    emptyMessage="Modèle introuvable."
                                    disabled={!formData.brand}
                                />
                            </div>
                        </div>

                        {/* Phase (if available) */}
                        {phases.length > 0 && (
                            <div className="animate-fade-up">
                                <div className="space-y-2">
                                    <Label className={`${labelCls} flex items-center gap-1.5`}>
                                        Version / Phase
                                        <span className="text-[9px] text-primary/50 normal-case tracking-normal font-normal">optionnel</span>
                                    </Label>
                                    <Select value={formData.phase} onValueChange={(v) => updateField("phase", v)}>
                                        <SelectTrigger className={selectCls}><SelectValue placeholder="Sélectionner la version" /></SelectTrigger>
                                        <SelectContent>
                                            {phases.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}

                        {/* Year + Mileage */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className={labelCls}>Année *</Label>
                                <Select value={formData.year} onValueChange={(v) => updateField("year", v)} disabled={!formData.model}>
                                    <SelectTrigger className={`${selectCls} ${!formData.model ? "opacity-40" : ""}`}>
                                        <SelectValue placeholder={formData.model ? "Sélectionner" : "Choisir un modèle"} />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-[240px]">
                                        {years.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className={labelCls}>Kilométrage</Label>
                                <Input id="mileage" type="number" placeholder="ex: 35 000" value={formData.mileage} onChange={(e) => updateField("mileage", e.target.value)} className={inputCls} />
                            </div>
                        </div>

                        {/* Price + Fuel */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className={labelCls}>Prix (€)</Label>
                                <div className="relative">
                                    <Input id="price" type="number" placeholder="ex: 34 900" value={formData.price} onChange={(e) => updateField("price", e.target.value)} className={`${inputCls} pr-8`} />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/30 text-xs font-medium">€</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className={`${labelCls} flex items-center gap-1.5`}>
                                    Carburant
                                    {(electricBrand || electricModel) && (
                                        <span className="inline-flex items-center gap-0.5 text-[9px] text-emerald-400 font-normal normal-case tracking-normal">
                                            <Zap className="w-2.5 h-2.5" /> auto
                                        </span>
                                    )}
                                </Label>
                                {(electricBrand || electricModel) ? (
                                    <div className="h-10 px-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] flex items-center gap-2 text-sm text-emerald-400">
                                        <Zap className="w-3.5 h-3.5" /> Électrique
                                    </div>
                                ) : (
                                    <Select value={formData.fuel} onValueChange={(v) => updateField("fuel", v)}>
                                        <SelectTrigger className={selectCls}><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                                        <SelectContent>{FUEL_TYPES.map((f) => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}</SelectContent>
                                    </Select>
                                )}
                            </div>
                        </div>

                        {/* Transmission */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className={`${labelCls} flex items-center gap-1.5`}>
                                    Boîte de vitesse
                                    {isElectric && <span className="inline-flex items-center gap-0.5 text-[9px] text-emerald-400 font-normal normal-case tracking-normal"><Zap className="w-2.5 h-2.5" /> auto</span>}
                                </Label>
                                {isElectric ? (
                                    <div className="h-10 px-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] flex items-center gap-2 text-sm text-emerald-400">
                                        <Zap className="w-3.5 h-3.5" /> Automatique
                                    </div>
                                ) : (
                                    <Select value={formData.transmission} onValueChange={(v) => updateField("transmission", v)}>
                                        <SelectTrigger className={selectCls}><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                                        <SelectContent>{TRANSMISSIONS.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent>
                                    </Select>
                                )}
                            </div>
                        </div>

                        {/* Electric info */}
                        {isElectric && (
                            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/15 animate-fade-up">
                                <Info className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                                <p className="text-[11px] text-emerald-400/80 leading-relaxed">
                                    Véhicule électrique détecté — carburant et boîte de vitesse configurés automatiquement.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* ─── Notes ─── */}
                <section className="animate-fade-up" style={{ animationDelay: "150ms" }}>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-4 rounded-full bg-gradient-to-b from-violet-500/50 to-violet-500/10" />
                        <h2 className="text-[11px] text-muted-foreground/70 uppercase tracking-[0.15em] font-semibold">
                            Notes <span className="normal-case tracking-normal text-muted-foreground/30 font-normal">· optionnel</span>
                        </h2>
                    </div>
                    <Textarea
                        placeholder="Défauts, historique, options spécifiques..."
                        value={formData.notes}
                        onChange={(e) => updateField("notes", e.target.value)}
                        className="min-h-[90px] text-sm bg-white/[0.02] border-border/30 focus:border-primary/40 focus:ring-2 focus:ring-primary/10 rounded-2xl resize-none placeholder:text-muted-foreground/25"
                    />
                </section>

                {/* ─── Submit ─── */}
                <div className="pt-4 animate-fade-up" style={{ animationDelay: "200ms" }}>
                    <Button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="w-full h-12 gradient-primary text-white text-sm font-semibold gap-2.5 rounded-2xl hover:opacity-90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 disabled:opacity-30 cursor-pointer"
                    >
                        {loading ? (
                            <><Loader2 className="w-4 h-4 animate-spin" />Génération en cours...</>
                        ) : (
                            <><Sparkles className="w-4 h-4" />Générer l&apos;annonce Leboncoin</>
                        )}
                    </Button>
                    <p className="text-center text-[10px] text-muted-foreground/40 mt-3 tracking-wide">
                        L&apos;annonce sera générée en ~30 secondes
                    </p>
                </div>
            </div>
        </div>
    );
}
