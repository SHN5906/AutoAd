"use client";

import { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    accent?: string;
}

export default function StatCard({ title, value, icon: Icon, trend, trendUp, accent = "text-primary" }: StatCardProps) {
    return (
        <div className="group relative rounded-xl border border-border/50 bg-card/50 p-4 hover:border-border transition-all duration-300 overflow-hidden">
            {/* Subtle top accent line */}
            <div className={`absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent ${accent === "text-primary" ? "via-primary/30" : accent === "text-emerald-400" ? "via-emerald-400/30" : accent === "text-violet-400" ? "via-violet-400/30" : "via-cyan-400/30"} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />

            <div className="flex items-start justify-between">
                <div className="space-y-1.5">
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">{title}</p>
                    <p className="text-2xl font-bold tracking-tight">{value}</p>
                    {trend && (
                        <p className={`text-[11px] font-medium ${trendUp ? "text-emerald-400" : "text-red-400"}`}>
                            {trendUp ? "↑" : "↓"} {trend}
                        </p>
                    )}
                </div>
                <div className={`w-9 h-9 rounded-lg bg-white/[0.03] flex items-center justify-center ${accent}`}>
                    <Icon className="w-4 h-4" />
                </div>
            </div>
        </div>
    );
}
