"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Vehicle } from "@/lib/mock-data";
import { getVehicles, deleteVehicle, initSampleData } from "@/lib/storage";
import { Search, Plus, ArrowLeft, Trash2, Eye, Car, ChevronRight, Calendar, Gauge } from "lucide-react";
import { toast } from "sonner";

export default function HistoryPage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [search, setSearch] = useState("");
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => {
        initSampleData();
        setVehicles(getVehicles());
    }, []);

    const filtered = vehicles.filter((v) => {
        const q = search.toLowerCase();
        return !q || `${v.brand} ${v.model} ${v.year}`.toLowerCase().includes(q);
    });

    const handleDelete = (id: string) => {
        deleteVehicle(id);
        setVehicles(getVehicles());
        toast.success("Annonce supprimée");
    };

    const statusLabels: Record<string, { label: string; class: string }> = {
        published: { label: "Publiée", class: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
        draft: { label: "Brouillon", class: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
        generating: { label: "En cours", class: "text-primary bg-primary/10 border-primary/20" },
    };

    const fuelLabels: Record<string, string> = {
        essence: "Essence", diesel: "Diesel", hybride: "Hybride", electrique: "Électrique", gpl: "GPL",
    };

    return (
        <div className="max-w-2xl mx-auto animate-fade-up pb-16">
            {/* Header */}
            <div className="flex items-center gap-4 pt-2 lg:pt-8 mb-8">
                <Link href="/dashboard">
                    <button className="w-9 h-9 rounded-xl border border-border/40 bg-white/[0.02] flex items-center justify-center hover:bg-white/[0.05] hover:border-border/60 transition-all duration-200">
                        <ArrowLeft className="w-4 h-4 text-muted-foreground" />
                    </button>
                </Link>
                <div className="flex-1">
                    <p className="text-[10px] text-primary/60 uppercase tracking-[0.2em] font-semibold">Historique</p>
                    <h1 className="text-2xl font-bold tracking-tight mt-0.5 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        Mes annonces
                    </h1>
                </div>
                <Link href="/dashboard/create">
                    <Button size="sm" className="h-9 px-4 text-xs font-semibold gradient-primary text-white gap-1.5 rounded-xl hover:opacity-90 transition-all">
                        <Plus className="w-3 h-3" /> Créer
                    </Button>
                </Link>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                <Input
                    placeholder="Rechercher une annonce..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 h-10 text-sm bg-white/[0.02] border-border/30 focus:border-primary/40 focus:ring-2 focus:ring-primary/10 rounded-xl placeholder:text-muted-foreground/25"
                />
            </div>

            {/* List */}
            <div className="rounded-2xl border border-border/30 bg-gradient-to-b from-white/[0.02] to-transparent divide-y divide-border/20 overflow-hidden">
                {filtered.length === 0 ? (
                    <div className="p-12 text-center">
                        <Car className="w-8 h-8 text-muted-foreground/20 mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground/50">
                            {search ? "Aucun résultat" : "Aucune annonce"}
                        </p>
                        {!search && (
                            <Link href="/dashboard/create">
                                <Button size="sm" className="mt-4 gradient-primary text-white rounded-xl text-xs gap-1.5">
                                    <Plus className="w-3 h-3" /> Créer ma première annonce
                                </Button>
                            </Link>
                        )}
                    </div>
                ) : (
                    filtered.map((v) => {
                        const expanded = expandedId === v.id;
                        const s = statusLabels[v.status] || statusLabels.draft;
                        return (
                            <div key={v.id}>
                                <button
                                    onClick={() => setExpandedId(expanded ? null : v.id)}
                                    className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/[0.02] transition-all duration-200 text-left"
                                >
                                    <div className="w-9 h-9 rounded-xl bg-white/[0.03] border border-border/20 flex items-center justify-center flex-shrink-0">
                                        <Car className="w-4 h-4 text-muted-foreground/40" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-medium truncate">{v.brand} {v.model}</p>
                                            <span className={`text-[9px] px-1.5 py-0.5 rounded-md border font-medium ${s.class}`}>
                                                {s.label}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-muted-foreground/40 mt-0.5">
                                            {v.year} · {v.mileage?.toLocaleString("fr-FR")} km · {v.price?.toLocaleString("fr-FR")} €
                                        </p>
                                    </div>
                                    <ChevronRight className={`w-4 h-4 text-muted-foreground/30 transition-transform duration-200 ${expanded ? "rotate-90" : ""}`} />
                                </button>

                                {/* Expanded detail */}
                                {expanded && (
                                    <div className="px-4 pb-4 animate-fade-up">
                                        <div className="ml-12 p-4 rounded-xl bg-white/[0.02] border border-border/20 space-y-3">
                                            <div className="grid grid-cols-2 gap-3 text-[11px]">
                                                <div className="flex items-center gap-1.5 text-muted-foreground/50">
                                                    <Calendar className="w-3 h-3" /> Année : <span className="text-foreground/70">{v.year}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-muted-foreground/50">
                                                    <Gauge className="w-3 h-3" /> Km : <span className="text-foreground/70">{v.mileage?.toLocaleString("fr-FR")}</span>
                                                </div>
                                                <div className="text-muted-foreground/50">
                                                    Carburant : <span className="text-foreground/70">{fuelLabels[v.fuel] || v.fuel}</span>
                                                </div>
                                                <div className="text-muted-foreground/50">
                                                    Boîte : <span className="text-foreground/70 capitalize">{v.transmission}</span>
                                                </div>
                                            </div>
                                            <div className="text-[11px] text-muted-foreground/50">
                                                Créée le : <span className="text-foreground/70">{v.createdAt}</span>
                                            </div>
                                            <div className="flex gap-2 pt-1">
                                                <Link href={`/dashboard/create?from=${v.id}`} className="flex-1">
                                                    <Button size="sm" variant="outline" className="w-full h-8 text-[11px] gap-1 border-border/30 rounded-lg hover:bg-white/[0.03]">
                                                        <Eye className="w-3 h-3" /> Regénérer
                                                    </Button>
                                                </Link>
                                                <Button size="sm" variant="outline" onClick={() => handleDelete(v.id)} className="h-8 px-3 text-[11px] gap-1 border-red-500/20 text-red-400 hover:bg-red-500/10 rounded-lg">
                                                    <Trash2 className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            <p className="text-center text-[10px] text-muted-foreground/30 mt-4">
                {filtered.length} annonce{filtered.length !== 1 ? "s" : ""}
            </p>
        </div>
    );
}
