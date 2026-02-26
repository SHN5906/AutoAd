"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    LayoutDashboard,
    PlusCircle,
    History,
    LogOut,
    Menu,
    X,
    ChevronRight,
} from "lucide-react";

const navItems = [
    { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
    { href: "/dashboard/create", label: "Nouvelle annonce", icon: PlusCircle },
    { href: "/dashboard/history", label: "Historique", icon: History },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        router.push("/login");
    };

    const isActive = (href: string) =>
        pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

    return (
        <>
            {/* ─── Mobile Top Bar ─── */}
            <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-[#09090b]/80 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-4">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                            <circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" />
                        </svg>
                    </div>
                    <span className="text-sm font-semibold">AutoAd</span>
                </Link>
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
                >
                    {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
            </header>

            {/* ─── Mobile Overlay ─── */}
            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* ─── Sidebar ─── */}
            <aside
                className={`fixed top-0 left-0 z-50 h-screen w-[220px] bg-[#0c0c0e] flex flex-col transition-transform duration-300 ease-out lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Logo */}
                <div className="h-14 flex items-center gap-2.5 px-5">
                    <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                            <circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" />
                        </svg>
                    </div>
                    <span className="text-sm font-semibold tracking-tight">AutoAd</span>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 pt-4 space-y-0.5">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50 font-medium px-3 mb-2">
                        Menu
                    </p>
                    {navItems.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={`group flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 ${active
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
                                    }`}
                            >
                                <item.icon className={`w-4 h-4 ${active ? "text-primary" : "text-muted-foreground/70 group-hover:text-foreground"}`} />
                                <span className="flex-1">{item.label}</span>
                                {active && <ChevronRight className="w-3 h-3 text-primary/50" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* Divider */}
                <div className="mx-4 h-px bg-border/40" />

                {/* User */}
                <div className="p-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/[0.03] transition-colors text-left">
                                <Avatar className="w-7 h-7">
                                    <AvatarFallback className="bg-primary/15 text-primary text-[10px] font-semibold">
                                        JD
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[13px] font-medium truncate">Jean Dupont</p>
                                    <p className="text-[10px] text-muted-foreground truncate">Premium Auto</p>
                                </div>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" sideOffset={8} className="w-48">
                            <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive cursor-pointer gap-2 text-xs">
                                <LogOut className="w-3.5 h-3.5" />
                                Se déconnecter
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </aside>
        </>
    );
}
