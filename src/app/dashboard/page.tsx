"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/stat-card";
import VehicleCard from "@/components/vehicle-card";
import { Vehicle } from "@/lib/mock-data";
import { getVehicles, getStats, initSampleData } from "@/lib/storage";
import {
    FileText, TrendingUp, Star, Eye, Plus, ArrowRight, Sparkles,
} from "lucide-react";

export default function DashboardPage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [stats, setStats] = useState({ totalAds: 0, thisMonth: 0, avgSeoScore: 0, totalViews: 0 });

    useEffect(() => {
        initSampleData();
        setVehicles(getVehicles());
        setStats(getStats());
    }, []);

    return (
        <div className="space-y-8 stagger">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pt-2 lg:pt-8">
                <div>
                    <p className="text-[10px] text-primary/60 uppercase tracking-[0.2em] font-semibold mb-1">Tableau de bord</p>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        Bonjour, Jean
                    </h1>
                </div>
                <Link href="/dashboard/create">
                    <Button className="h-10 px-5 text-xs font-semibold gradient-primary text-white gap-2 rounded-2xl hover:opacity-90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                        <Plus className="w-3.5 h-3.5" />
                        Nouvelle annonce
                    </Button>
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard title="Total annonces" value={stats.totalAds} icon={FileText} trend={`+${stats.thisMonth} ce mois`} trendUp accent="text-primary" />
                <StatCard title="Ce mois" value={stats.thisMonth} icon={TrendingUp} trend="+23%" trendUp accent="text-violet-400" />
                <StatCard title="Score SEO moyen" value={stats.avgSeoScore > 0 ? `${stats.avgSeoScore}/100` : "—"} icon={Star} trend={stats.avgSeoScore >= 90 ? "Top 5%" : ""} trendUp accent="text-emerald-400" />
                <StatCard title="Vues totales" value={stats.totalViews.toLocaleString("fr-FR")} icon={Eye} trend="+340 cette semaine" trendUp accent="text-cyan-400" />
            </div>

            {/* CTA Banner */}
            <div className="relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-r from-primary/[0.06] via-transparent to-violet-500/[0.04] p-5 md:p-6">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.03] rounded-full blur-[80px]" />
                <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-sm font-semibold">Générez une annonce optimisée en 30 secondes</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Photos + caractéristiques → annonce Leboncoin prête à publier
                        </p>
                    </div>
                    <Link href="/dashboard/create">
                        <Button variant="outline" size="sm" className="gap-1.5 text-xs border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/30 rounded-xl">
                            Commencer
                            <ArrowRight className="w-3 h-3" />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Recent Listings */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-4 rounded-full gradient-primary" />
                        <h2 className="text-sm font-semibold">Annonces récentes</h2>
                    </div>
                    <Link href="/dashboard/history">
                        <button className="text-[11px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                            Tout voir <ArrowRight className="w-3 h-3" />
                        </button>
                    </Link>
                </div>
                <div className="rounded-2xl border border-border/30 bg-gradient-to-b from-white/[0.01] to-transparent divide-y divide-border/20">
                    {vehicles.length === 0 ? (
                        <div className="p-10 text-center">
                            <p className="text-sm text-muted-foreground/50">Aucune annonce pour le moment</p>
                            <Link href="/dashboard/create">
                                <Button size="sm" className="mt-4 gradient-primary text-white rounded-xl text-xs gap-1.5">
                                    <Plus className="w-3 h-3" /> Créer ma première annonce
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        vehicles.slice(0, 5).map((vehicle) => (
                            <VehicleCard key={vehicle.id} vehicle={vehicle} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
