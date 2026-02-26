import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mentions légales — AutoAd",
    description: "Mentions légales et conditions d'utilisation de la plateforme AutoAd.",
};

export default function LegalPage() {
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
            </nav>

            <div className="max-w-2xl mx-auto px-6 py-16">
                <h1 className="text-3xl font-bold tracking-tight mb-8 gradient-text">Mentions légales</h1>

                <div className="space-y-8 text-sm text-muted-foreground/70 leading-relaxed">
                    <section>
                        <h2 className="text-base font-semibold text-foreground mb-3">Editeur du site</h2>
                        <p>AutoAd est un service de generation d&apos;annonces automobiles propulse par l&apos;intelligence artificielle.</p>
                        <p className="mt-2">Contact : contact@autoad.fr</p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-foreground mb-3">Hebergement</h2>
                        <p>Le site est heberge par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.</p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-foreground mb-3">Conditions d&apos;utilisation</h2>
                        <p>En utilisant AutoAd, vous acceptez les presentes conditions. Le service est fourni en l&apos;etat et peut etre modifie a tout moment.</p>
                        <p className="mt-2">Les annonces generees sont des suggestions. L&apos;utilisateur est responsable du contenu qu&apos;il publie sur les plateformes tierces (Leboncoin, etc.).</p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-foreground mb-3">Donnees personnelles</h2>
                        <p>AutoAd stocke vos donnees localement dans votre navigateur (localStorage). Aucune donnee personnelle n&apos;est transmise a des tiers sans votre consentement.</p>
                        <p className="mt-2">Conformement au RGPD, vous disposez d&apos;un droit d&apos;acces, de modification et de suppression de vos donnees.</p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-foreground mb-3">Propriete intellectuelle</h2>
                        <p>L&apos;ensemble du contenu du site (textes, graphismes, logos, icones) est protege par les lois relatives a la propriete intellectuelle.</p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-foreground mb-3">Cookies</h2>
                        <p>Le site utilise un cookie de session pour l&apos;authentification. Aucun cookie de tracking n&apos;est utilise.</p>
                    </section>
                </div>

                <div className="mt-12 pt-6 border-t border-border/20">
                    <Link href="/" className="text-xs text-primary hover:text-primary/80 transition-colors">
                        Retour a l&apos;accueil
                    </Link>
                </div>
            </div>
        </div>
    );
}
