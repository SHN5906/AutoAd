import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen mesh-bg flex items-center justify-center p-6">
            <div className="text-center max-w-md animate-fade-up">
                <div className="text-7xl font-bold gradient-text mb-4">404</div>
                <h1 className="text-xl font-semibold mb-2">Page introuvable</h1>
                <p className="text-sm text-muted-foreground/60 mb-8">
                    La page que vous recherchez n&apos;existe pas ou a été déplacée.
                </p>
                <div className="flex gap-3 justify-center">
                    <Link
                        href="/"
                        className="h-10 px-5 inline-flex items-center justify-center text-xs font-semibold gradient-primary text-white rounded-xl hover:opacity-90 transition-all"
                    >
                        Retour à l&apos;accueil
                    </Link>
                    <Link
                        href="/dashboard"
                        className="h-10 px-5 inline-flex items-center justify-center text-xs font-medium border border-border/30 rounded-xl hover:bg-white/[0.03] transition-all"
                    >
                        Tableau de bord
                    </Link>
                </div>
            </div>
        </div>
    );
}
