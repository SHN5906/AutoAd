import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Shield, Clock, BarChart3, Car } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen mesh-bg-vivid text-white overflow-hidden">
      {/* ─── Nav ─── */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 h-16">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
            <Car className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-semibold tracking-tight">AutoAd</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-white/50 hover:text-white transition-colors px-3 py-1.5">
            Se connecter
          </Link>
          <Link href="/login" className="text-sm font-medium gradient-primary text-white px-4 py-2 rounded-xl hover:opacity-90 transition-all">
            Commencer
          </Link>
        </div>
      </nav>

      {/* Decorative orbs */}
      <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-primary/[0.06] blur-[150px] animate-float" />
      <div className="absolute top-[30%] right-[5%] w-[600px] h-[600px] rounded-full bg-violet-500/[0.05] blur-[180px] animate-float delay-2" />
      <div className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] rounded-full bg-cyan-500/[0.03] blur-[120px] animate-float delay-4" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "80px 80px"
      }} />

      {/* ─── Hero ─── */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-20 md:pt-32 pb-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/[0.06] mb-8 animate-fade-up">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-medium text-primary">Propulsé par l&apos;IA</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight max-w-4xl animate-fade-up" style={{ animationDelay: "80ms" }}>
          <span className="gradient-text">Créez des annonces</span>
          <br />
          <span className="text-white/90">auto qui vendent.</span>
        </h1>

        <p className="text-lg md:text-xl text-white/35 max-w-xl mt-6 leading-relaxed animate-fade-up" style={{ animationDelay: "160ms" }}>
          Uploadez vos photos, renseignez les caractéristiques, et obtenez une annonce Leboncoin optimisée SEO en 30 secondes.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-10 animate-fade-up" style={{ animationDelay: "240ms" }}>
          <Link href="/login" className="inline-flex items-center justify-center gap-2 gradient-primary text-white text-sm font-semibold px-7 py-3.5 rounded-2xl hover:opacity-90 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
            Commencer gratuitement
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="#features" className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white/50 px-7 py-3.5 rounded-2xl border border-white/10 hover:border-white/20 hover:text-white/70 transition-all">
            Découvrir
          </Link>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-10 md:gap-16 mt-16 animate-fade-up" style={{ animationDelay: "320ms" }}>
          <div className="text-center">
            <p className="text-3xl font-bold text-white/90 tabular-nums">2 400+</p>
            <p className="text-[11px] text-white/25 mt-1 uppercase tracking-wider">annonces générées</p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <p className="text-3xl font-bold text-white/90 tabular-nums">92%</p>
            <p className="text-[11px] text-white/25 mt-1 uppercase tracking-wider">score SEO moyen</p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <p className="text-3xl font-bold text-white/90 tabular-nums">30s</p>
            <p className="text-[11px] text-white/25 mt-1 uppercase tracking-wider">par annonce</p>
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="relative z-10 max-w-5xl mx-auto px-6 py-20 md:py-28">
        <div className="text-center mb-16">
          <p className="text-[11px] text-primary/60 uppercase tracking-[0.2em] font-semibold mb-3">Fonctionnalités</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Tout pour <span className="gradient-text">gagner du temps</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: Zap, color: "text-amber-400", border: "border-amber-500/15", bg: "bg-amber-500/[0.06]", title: "Génération IA", desc: "Annonces optimisées SEO générées instantanément par intelligence artificielle." },
            { icon: Shield, color: "text-emerald-400", border: "border-emerald-500/15", bg: "bg-emerald-500/[0.06]", title: "Format Leboncoin", desc: "Texte plain-text, sans emoji, sans markdown. Prêt à copier-coller directement." },
            { icon: Clock, color: "text-cyan-400", border: "border-cyan-500/15", bg: "bg-cyan-500/[0.06]", title: "30 secondes", desc: "De la photo à l'annonce publiable en moins d'une minute. Gain de temps garanti." },
            { icon: Car, color: "text-violet-400", border: "border-violet-500/15", bg: "bg-violet-500/[0.06]", title: "Base véhicules", desc: "40+ marques, 500+ modèles avec phases et motorisations. Détection auto des VE." },
            { icon: BarChart3, color: "text-primary", border: "border-primary/15", bg: "bg-primary/[0.06]", title: "Score SEO", desc: "Chaque annonce est analysée et optimisée pour maximiser la visibilité." },
            { icon: Sparkles, color: "text-rose-400", border: "border-rose-500/15", bg: "bg-rose-500/[0.06]", title: "Multi-styles", desc: "Standard, version courte, ou style vendeur. Adapté à chaque besoin." },
          ].map((f, i) => (
            <div key={i} className={`group rounded-2xl border ${f.border} bg-white/[0.01] p-6 hover:bg-white/[0.03] transition-all duration-300`}>
              <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                <f.icon className={`w-5 h-5 ${f.color}`} />
              </div>
              <h3 className="text-sm font-semibold mb-1.5">{f.title}</h3>
              <p className="text-xs text-white/35 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 py-20 md:py-28">
        <div className="text-center mb-16">
          <p className="text-[11px] text-primary/60 uppercase tracking-[0.2em] font-semibold mb-3">Comment ça marche</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            En <span className="gradient-text">3 étapes</span>
          </h2>
        </div>

        <div className="space-y-8">
          {[
            { step: "01", title: "Renseignez votre véhicule", desc: "Marque, modèle, année, kilométrage — notre base intelligente pré-remplit les informations pour vous." },
            { step: "02", title: "Ajoutez vos photos", desc: "Glissez-déposez jusqu'à 10 photos. L'IA analyse les visuels pour enrichir la description." },
            { step: "03", title: "Copiez votre annonce", desc: "Récupérez l'annonce optimisée SEO et publiez-la sur Leboncoin en un clic." },
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center flex-shrink-0 text-sm font-bold text-white shadow-lg shadow-primary/20">
                {s.step}
              </div>
              <div className="pt-1">
                <h3 className="text-base font-semibold mb-1">{s.title}</h3>
                <p className="text-sm text-white/35 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 py-20 md:py-28">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-b from-primary/[0.08] to-transparent p-10 md:p-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Prêt à <span className="gradient-text">gagner du temps</span> ?
          </h2>
          <p className="text-sm text-white/35 max-w-md mx-auto mb-8 leading-relaxed">
            Rejoignez les concessionnaires qui utilisent AutoAd pour générer leurs annonces en un temps record.
          </p>
          <Link href="/login" className="inline-flex items-center gap-2 gradient-primary text-white text-sm font-semibold px-8 py-4 rounded-2xl hover:opacity-90 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
            Créer mon compte gratuitement
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="relative z-10 border-t border-white/[0.05] px-6 md:px-12 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
              <Car className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-semibold">AutoAd</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/pricing" className="text-[11px] text-white/30 hover:text-white/60 transition-colors">Tarifs</Link>
            <Link href="/legal" className="text-[11px] text-white/30 hover:text-white/60 transition-colors">Mentions légales</Link>
            <p className="text-[11px] text-white/20">© 2026 AutoAd</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
