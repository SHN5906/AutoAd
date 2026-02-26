"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Check, LogOut } from "lucide-react";
import { toast } from "sonner";

interface Profile {
    name: string;
    email: string;
    concession: string;
}

export default function ProfilePage() {
    const router = useRouter();
    const [profile, setProfile] = useState<Profile>({ name: "", email: "", concession: "" });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("autoad-profile");
        if (stored) {
            try { setProfile(JSON.parse(stored)); } catch { /* noop */ }
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem("autoad-profile", JSON.stringify(profile));
        setSaved(true);
        toast.success("Profil sauvegardé");
        setTimeout(() => setSaved(false), 2000);
    };

    const handleLogout = () => {
        document.cookie = "autoad-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/login");
    };

    const inputCls = "h-10 text-sm bg-white/[0.02] border-border/30 focus:border-primary/40 focus:ring-2 focus:ring-primary/10 rounded-xl placeholder:text-muted-foreground/25";
    const labelCls = "text-[11px] uppercase tracking-[0.15em] text-muted-foreground/60 font-semibold";

    return (
        <div className="max-w-lg mx-auto animate-fade-up pb-16">
            {/* Header */}
            <div className="flex items-center gap-4 pt-2 lg:pt-8 mb-8">
                <Link href="/dashboard">
                    <button className="w-9 h-9 rounded-xl border border-border/40 bg-white/[0.02] flex items-center justify-center hover:bg-white/[0.05] hover:border-border/60 transition-all duration-200">
                        <ArrowLeft className="w-4 h-4 text-muted-foreground" />
                    </button>
                </Link>
                <div className="flex-1">
                    <p className="text-[10px] text-primary/60 uppercase tracking-[0.2em] font-semibold">Paramètres</p>
                    <h1 className="text-2xl font-bold tracking-tight mt-0.5 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        Mon profil
                    </h1>
                </div>
            </div>

            {/* Profile Form */}
            <div className="rounded-2xl border border-border/30 bg-gradient-to-b from-white/[0.02] to-transparent p-6 space-y-5">
                <div className="flex items-center gap-4 pb-5 border-b border-border/20">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-lg font-bold">
                        {profile.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "U"}
                    </div>
                    <div>
                        <p className="text-sm font-semibold">{profile.name || "Utilisateur"}</p>
                        <p className="text-xs text-muted-foreground/50 mt-0.5">{profile.email}</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className={labelCls}>Nom complet</Label>
                    <Input
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        placeholder="Jean Dupont"
                        className={inputCls}
                    />
                </div>

                <div className="space-y-2">
                    <Label className={labelCls}>Email</Label>
                    <Input
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        placeholder="jean@concession.fr"
                        type="email"
                        className={inputCls}
                    />
                </div>

                <div className="space-y-2">
                    <Label className={labelCls}>Nom de la concession</Label>
                    <Input
                        value={profile.concession}
                        onChange={(e) => setProfile({ ...profile, concession: e.target.value })}
                        placeholder="Auto Premium Nice"
                        className={inputCls}
                    />
                </div>

                <Button
                    onClick={handleSave}
                    className={`w-full h-10 gap-1.5 text-xs font-semibold rounded-xl transition-all duration-300 ${saved
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "gradient-primary text-white hover:opacity-90 hover:shadow-lg hover:shadow-primary/20"
                        }`}
                >
                    {saved ? <><Check className="w-3.5 h-3.5" /> Sauvegardé</> : <><Save className="w-3.5 h-3.5" /> Enregistrer</>}
                </Button>
            </div>

            {/* Danger Zone */}
            <div className="mt-6 rounded-2xl border border-red-500/10 bg-red-500/[0.02] p-5">
                <p className="text-xs font-semibold text-red-400/80 mb-3">Zone de danger</p>
                <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="h-9 text-xs gap-1.5 border-red-500/20 text-red-400 hover:bg-red-500/10 rounded-xl"
                >
                    <LogOut className="w-3.5 h-3.5" /> Se déconnecter
                </Button>
            </div>
        </div>
    );
}
