import Link from "next/link";
import type { Metadata } from "next";
import { Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Tarifs — AutoAd",
    description: "Choisissez le plan qui correspond à vos besoins. Générez des annonces automobiles optimisées SEO.",
};

const plans = [
    {
        name: "Starter",
        price: "Gratuit",
        period: "",
        description: "Pour tester la plateforme",
        features: [
            "5 annonces / mois",
            "Base véhicules FR",
            "Score SEO",
            "Copier-coller rapide",
        ],
        cta: "Commencer",
        href: "/login",
        highlight: false,
    },
    {
        name: "Pro",
        price: "19",
        period: "/ mois",
        description: "Pour les vendeurs actifs",
        features: [
            "Annonces illimitées",
            "3 styles de rédaction",
            "Analyse photos IA",
            "Score SEO avancé",
            "Historique complet",
            "Support prioritaire",
        ],
        cta: "Essai gratuit 14 jours",
        href: "/login",
        highlight: true,
    },
    {
        name: "Concession",
        price: "49",
        period: "/ mois",
        description: "Pour les professionnels",
        features: [
            "Tout du plan Pro",
            "Multi-utilisateurs",
            "API dédiée",
            "Branding personnalisé",
            "Export en masse",
            "Account manager",
        ],
        cta: "Nous contacter",
        href: "/login",
        highlight: false,
    },
];

export default function PricingPage() {
    return (
        <div className="min-h-screen mesh-bg">
            {/* Nav */}
            <nav className="flex items-center justify-between px-6 md:px-12 h-16">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                            <circle cx="7" cy="17" r="2" />
                            <path d="M9 17h6" />
                            <circle cx="17" cy="17" r="2" />
                        </svg>
                    </div>
                    <span className="text-sm font-semibold tracking-tight">AutoAd</span>
                </Link>
                <Link href="/login" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Se connecter
                </Link>
            </nav>

            <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
                {/* Header */}
                <div className="text-center mb-16 animate-fade-up">
                    <p className="text-[10px] text-primary/60 uppercase tracking-[0.25em] font-semibold mb-3">Tarifs</p>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        <span className="gradient-text">Simple et transparent</span>
                    </h1>
                    <p className="text-muted-foreground/60 max-w-md mx-auto">
                        Pas de frais cachés. Commencez gratuitement, évoluez quand vous le souhaitez.
                    </p>
                </div>

                {/* Plans */}
                <div className="grid md:grid-cols-3 gap-5 stagger">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`rounded-2xl border p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 ${plan.highlight
                                    ? "border-primary/30 bg-primary/[0.03] glow"
                                    : "border-border/20 bg-white/[0.01]"
                                }`}
                        >
                            {plan.highlight && (
                                <div className="text-[9px] uppercase tracking-[0.2em] text-primary font-semibold mb-3">
                                    Le plus populaire
                                </div>
                            )}
                            <h3 className="text-lg font-semibold">{plan.name}</h3>
                            <p className="text-xs text-muted-foreground/50 mt-1">{plan.description}</p>

                            <div className="flex items-baseline gap-1 mt-5 mb-6">
                                {plan.price === "Gratuit" ? (
                                    <span className="text-3xl font-bold">Gratuit</span>
                                ) : (
                                    <>
                                        <span className="text-3xl font-bold">{plan.price}€</span>
                                        <span className="text-sm text-muted-foreground/40">{plan.period}</span>
                                    </>
                                )}
                            </div>

                            <ul className="space-y-2.5 flex-1 mb-6">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2 text-[13px] text-muted-foreground/70">
                                        <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <Link href={plan.href}>
                                <button
                                    className={`w-full h-10 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${plan.highlight
                                            ? "gradient-primary text-white hover:opacity-90 hover:shadow-lg hover:shadow-primary/20"
                                            : "border border-border/30 hover:bg-white/[0.03] hover:border-border/50"
                                        }`}
                                >
                                    {plan.cta}
                                    <ArrowRight className="w-3 h-3" />
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
