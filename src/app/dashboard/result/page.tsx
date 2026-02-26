"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Copy, Save, RefreshCw, ArrowLeft, Check, ChevronDown, Zap, Minimize2, Loader2, Pencil, Eye,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { saveVehicle, saveGeneration, updateVehicle } from "@/lib/storage";

interface ResultData {
    content: string;
    seoScore: number;
    style: string;
    vehicle: {
        brand: string; model: string; phase?: string; year: string;
        mileage: string; price: string; fuel: string; transmission: string; notes: string;
    };
    imageCount: number;
    vehicleId?: string;
    saved?: boolean;
}

export default function ResultPage() {
    const router = useRouter();
    const [result, setResult] = useState<ResultData | null>(null);
    const [copied, setCopied] = useState(false);
    const [regenerating, setRegenerating] = useState(false);
    const [saved, setSaved] = useState(false);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const stored = sessionStorage.getItem("autoad-result");
        if (stored) {
            const data = JSON.parse(stored);
            setResult(data);
            setSaved(!!data.saved);
        } else {
            router.push("/dashboard/create");
        }
    }, [router]);

    const handleCopy = async () => {
        if (!result) return;
        await navigator.clipboard.writeText(result.content);
        setCopied(true);
        toast.success("Copié dans le presse-papiers");
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSave = () => {
        if (!result || saved) return;

        // Save vehicle to localStorage
        const v = result.vehicle;
        const vehicle = saveVehicle({
            brand: v.brand,
            model: v.model,
            year: Number(v.year) || 2024,
            mileage: Number(v.mileage) || 0,
            price: Number(v.price) || 0,
            fuel: v.fuel || "",
            transmission: v.transmission || "",
            notes: v.notes || "",
            images: [],
            status: "published",
        });

        // Save generation
        saveGeneration({
            vehicleId: vehicle.id,
            content: result.content,
            style: (result.style as "standard" | "short" | "sales") || "standard",
            seoScore: result.seoScore,
        });

        // Mark as saved in sessionStorage
        const updated = { ...result, vehicleId: vehicle.id, saved: true };
        sessionStorage.setItem("autoad-result", JSON.stringify(updated));
        setResult(updated);
        setSaved(true);
        toast.success("Annonce sauvegardée !");
    };

    const handleRegenerate = async (style: string) => {
        if (!result) return;
        setRegenerating(true);
        try {
            const response = await fetch("/api/generate-car-description", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...result.vehicle, style, images: [] }),
            });
            const data = await response.json();
            if (data.success) {
                const newResult = { ...result, content: data.data.content, seoScore: data.data.seoScore, style: data.data.style, saved: false };
                setResult(newResult);
                setSaved(false);
                sessionStorage.setItem("autoad-result", JSON.stringify(newResult));
                toast.success(style === "short" ? "Version courte générée" : "Version vendeur générée");
            }
        } catch {
            toast.error("Erreur lors de la régénération");
        } finally {
            setRegenerating(false);
        }
    };

    if (!result) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
            </div>
        );
    }

    const scoreColor = result.seoScore >= 90 ? "text-emerald-400" : result.seoScore >= 75 ? "text-amber-400" : "text-red-400";
    const barColor = result.seoScore >= 90 ? "bg-emerald-400" : result.seoScore >= 75 ? "bg-amber-400" : "bg-red-400";

    const styleLabels: Record<string, { label: string; class: string }> = {
        standard: { label: "Standard", class: "border-primary/20 text-primary" },
        short: { label: "Court", class: "border-amber-500/20 text-amber-400" },
        sales: { label: "Vendeur", class: "border-emerald-500/20 text-emerald-400" },
    };
    const currentStyle = styleLabels[result.style] || styleLabels.standard;

    return (
        <div className="max-w-2xl mx-auto animate-fade-up pb-16">
            {/* Header */}
            <div className="flex items-center gap-4 pt-2 lg:pt-8 mb-8">
                <Link href="/dashboard/create">
                    <button className="w-9 h-9 rounded-xl border border-border/40 bg-white/[0.02] flex items-center justify-center hover:bg-white/[0.05] hover:border-border/60 transition-all duration-200">
                        <ArrowLeft className="w-4 h-4 text-muted-foreground" />
                    </button>
                </Link>
                <div className="flex-1">
                    <p className="text-[10px] text-primary/60 uppercase tracking-[0.2em] font-semibold">Résultat</p>
                    <h1 className="text-2xl font-bold tracking-tight mt-0.5 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        {result.vehicle.brand} {result.vehicle.model}
                    </h1>
                </div>
                <Badge variant="outline" className={`text-[10px] h-6 px-2.5 font-normal rounded-lg ${currentStyle.class}`}>
                    {currentStyle.label}
                </Badge>
            </div>

            {/* SEO Score */}
            <div className="rounded-2xl border border-border/30 bg-gradient-to-b from-white/[0.02] to-transparent p-5 mb-4">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] text-muted-foreground/70 uppercase tracking-[0.15em] font-semibold">Score SEO</span>
                    <span className={`text-xl font-bold tabular-nums ${scoreColor}`}>
                        {result.seoScore}<span className="text-xs font-normal text-muted-foreground/40">/100</span>
                    </span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/[0.03] overflow-hidden">
                    <div
                        className={`h-full rounded-full ${barColor} transition-all duration-1000 ease-out`}
                        style={{ width: `${result.seoScore}%` }}
                    />
                </div>
            </div>

            {/* Generated Ad */}
            <div className="rounded-2xl border border-border/30 bg-gradient-to-b from-white/[0.02] to-transparent overflow-hidden mb-5">
                <div className="px-5 py-3 border-b border-border/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-4 rounded-full gradient-primary" />
                        <span className="text-[11px] text-muted-foreground/70 uppercase tracking-[0.15em] font-semibold">Annonce générée</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setEditing(!editing)}
                            className={`text-[11px] transition-colors flex items-center gap-1 ${editing ? "text-primary" : "text-muted-foreground/50 hover:text-foreground"
                                }`}
                        >
                            {editing ? <><Eye className="w-3 h-3" /> Aperçu</> : <><Pencil className="w-3 h-3" /> Modifier</>}
                        </button>
                        <button
                            onClick={handleCopy}
                            className="text-[11px] text-muted-foreground/50 hover:text-foreground transition-colors flex items-center gap-1"
                        >
                            {copied ? <><Check className="w-3 h-3 text-emerald-400" /><span className="text-emerald-400">Copié</span></> : <><Copy className="w-3 h-3" /> Copier</>}
                        </button>
                    </div>
                </div>
                <div className="p-5">
                    {editing ? (
                        <textarea
                            value={result.content}
                            onChange={(e) => {
                                const updated = { ...result, content: e.target.value, saved: false };
                                setResult(updated);
                                setSaved(false);
                                sessionStorage.setItem("autoad-result", JSON.stringify(updated));
                            }}
                            className="w-full min-h-[400px] bg-transparent text-[13px] leading-relaxed text-foreground/85 font-[inherit] resize-y outline-none border border-border/20 rounded-xl p-4 focus:border-primary/30 focus:ring-1 focus:ring-primary/10 transition-all"
                        />
                    ) : (
                        <pre className="whitespace-pre-wrap text-[13px] leading-relaxed text-foreground/85 font-[inherit]">
                            {result.content}
                        </pre>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2.5">
                <Button
                    onClick={handleCopy}
                    variant="outline"
                    size="sm"
                    className="flex-1 h-10 gap-1.5 text-xs border-border/30 hover:bg-white/[0.03] rounded-xl"
                >
                    {copied ? <><Check className="w-3.5 h-3.5 text-emerald-400" /><span className="text-emerald-400">Copié</span></> : <><Copy className="w-3.5 h-3.5" /> Copier</>}
                </Button>

                <Button
                    onClick={handleSave}
                    variant="outline"
                    size="sm"
                    disabled={saved}
                    className={`flex-1 h-10 gap-1.5 text-xs rounded-xl transition-all ${saved ? "border-emerald-500/20 text-emerald-400 bg-emerald-500/[0.04]" : "border-border/30 hover:bg-white/[0.03]"}`}
                >
                    {saved ? <><Check className="w-3.5 h-3.5" /> Sauvegardé</> : <><Save className="w-3.5 h-3.5" /> Sauvegarder</>}
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            size="sm"
                            className="flex-1 h-10 gap-1.5 text-xs gradient-primary text-white rounded-xl hover:opacity-90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                            disabled={regenerating}
                        >
                            {regenerating ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                                <>
                                    <RefreshCw className="w-3.5 h-3.5" />
                                    Regénérer
                                    <ChevronDown className="w-3 h-3 ml-0.5" />
                                </>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onClick={() => handleRegenerate("short")} className="cursor-pointer gap-2 text-xs">
                            <Minimize2 className="w-3.5 h-3.5 text-amber-400" /> Plus court
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRegenerate("sales")} className="cursor-pointer gap-2 text-xs">
                            <Zap className="w-3.5 h-3.5 text-emerald-400" /> Plus vendeur
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <p className="text-center text-[10px] text-muted-foreground/30 mt-4">
                Copiez l&apos;annonce et collez-la directement sur Leboncoin
            </p>
        </div>
    );
}
