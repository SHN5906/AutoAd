"use client";

import { Badge } from "@/components/ui/badge";
import { Calendar, Gauge, ChevronRight } from "lucide-react";
import type { Vehicle } from "@/lib/mock-data";

const statusConfig: Record<string, { class: string; label: string }> = {
    published: { class: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", label: "Publié" },
    draft: { class: "bg-amber-500/10 text-amber-400 border-amber-500/20", label: "Brouillon" },
    generating: { class: "bg-primary/10 text-primary border-primary/20", label: "En cours" },
};

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
    const status = statusConfig[vehicle.status];

    return (
        <div className="group flex items-center gap-4 p-3 rounded-lg border border-transparent hover:border-border/50 hover:bg-white/[0.02] transition-all duration-200 cursor-pointer">
            {/* Icon */}
            <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-border/30 flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/60">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                    <circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" />
                </svg>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-medium truncate">
                        {vehicle.brand} {vehicle.model}
                    </h3>
                    <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-[18px] font-normal ${status.class}`}>
                        {status.label}
                    </Badge>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {vehicle.year}
                    </span>
                    <span className="flex items-center gap-1">
                        <Gauge className="w-3 h-3" />
                        {vehicle.mileage.toLocaleString("fr-FR")} km
                    </span>
                </div>
            </div>

            {/* Price + Arrow */}
            <div className="text-right flex-shrink-0 flex items-center gap-2">
                <div>
                    <p className="text-sm font-semibold tabular-nums">
                        {vehicle.price.toLocaleString("fr-FR")} €
                    </p>
                    <p className="text-[10px] text-muted-foreground">{vehicle.createdAt}</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors" />
            </div>
        </div>
    );
}
