"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, PlusCircle, Clock, User, LogOut, Menu, X } from "lucide-react";

const navItems = [
    { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
    { href: "/dashboard/create", label: "Nouvelle annonce", icon: PlusCircle },
    { href: "/dashboard/history", label: "Historique", icon: Clock },
];

interface UserProfile {
    name: string;
    email: string;
    concession: string;
}

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profile, setProfile] = useState<UserProfile>({ name: "Utilisateur", email: "", concession: "" });

    useEffect(() => {
        const stored = localStorage.getItem("autoad-profile");
        if (stored) {
            try { setProfile(JSON.parse(stored)); } catch { /* noop */ }
        }
    }, []);

    const isActive = (href: string) =>
        href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

    const handleLogout = () => {
        document.cookie = "autoad-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/login");
    };

    const initials = profile.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U";

    return (
        <>
            {/* Mobile Top Bar */}
            <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-[#09090b]/80 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-4">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                            <circle cx="7" cy="17" r="2" />
                            <path d="M9 17h6" />
                            <circle cx="17" cy="17" r="2" />
                        </svg>
                    </div>
                    <span className="text-sm font-semibold tracking-tight">AutoAd</span>
                </Link>
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
                >
                    {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
            </header>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-screen w-[220px] bg-[#0c0c0e] flex flex-col transition-transform duration-300 ease-out lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Logo */}
                <div className="h-14 flex items-center gap-2.5 px-5">
                    <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                            <circle cx="7" cy="17" r="2" />
                            <path d="M9 17h6" />
                            <circle cx="17" cy="17" r="2" />
                        </svg>
                    </div>
                    <span className="text-sm font-semibold tracking-tight">AutoAd</span>
                </div>

                {/* Menu label */}
                <div className="px-5 mt-2 mb-2">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40 font-semibold">Menu</p>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 space-y-0.5">
                    {navItems.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center gap-2.5 px-3 h-9 rounded-lg text-[13px] transition-all duration-200 ${active
                                        ? "bg-primary/10 text-primary font-medium"
                                        : "text-muted-foreground/60 hover:text-foreground hover:bg-white/[0.03]"
                                    }`}
                            >
                                <item.icon className="w-4 h-4 flex-shrink-0" />
                                <span>{item.label}</span>
                                {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* User */}
                <div className="p-3 mt-auto border-t border-border/20">
                    <Link
                        href="/dashboard/profile"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-white/[0.03] transition-colors group"
                    >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-[11px] font-bold flex-shrink-0">
                            {initials}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">{profile.name}</p>
                            <p className="text-[10px] text-muted-foreground/40 truncate">{profile.concession || profile.email}</p>
                        </div>
                        <User className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors" />
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-red-500/10 transition-colors w-full mt-1 text-muted-foreground/40 hover:text-red-400"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Déconnexion</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
