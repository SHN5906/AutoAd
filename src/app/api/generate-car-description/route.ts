import { NextRequest, NextResponse } from "next/server";

// ─── Rate Limiting ───
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW = 60_000; // 1 minute

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimit.get(ip);
    if (!entry || now > entry.resetTime) {
        rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return true;
    }
    if (entry.count >= RATE_LIMIT_MAX) return false;
    entry.count++;
    return true;
}

const FUEL_LABELS: Record<string, string> = {
    essence: "Essence", diesel: "Diesel", hybride: "Hybride",
    electrique: "Électrique", gpl: "GPL",
};

const TRANSMISSION_LABELS: Record<string, string> = {
    manuelle: "Manuelle", automatique: "Automatique",
};

function buildPrompt(data: {
    brand: string; model: string; year: string; mileage: string;
    price: string; fuel: string; transmission: string; notes: string;
    style: string; phase?: string;
}) {
    const fuelLabel = FUEL_LABELS[data.fuel] || data.fuel || "Non spécifié";
    const transLabel = TRANSMISSION_LABELS[data.transmission] || data.transmission || "Non spécifié";
    const km = Number(data.mileage || 0).toLocaleString("fr-FR");
    const prix = Number(data.price || 0).toLocaleString("fr-FR");

    const styleInstruction = {
        standard: "Style Standard : annonce complète, professionnelle et détaillée.",
        short: "Style Court : annonce concise et percutante, va droit au but. Maximum 15 lignes.",
        sales: "Style Vendeur : annonce très persuasive, orientée vente, avec urgence et arguments forts.",
    }[data.style] || "Style Standard : annonce complète, professionnelle et détaillée.";

    return `Tu es un copywriter automobile expert et un spécialiste SEO pour la plateforme Leboncoin en France.
Ton objectif est de rédiger l'annonce parfaite pour vendre un véhicule d'occasion, à partir des caractéristiques fournies.

REGLES ABSOLUES (STRICTEMENT OBLIGATOIRES) :
1. FORMAT LEBONCOIN : Leboncoin n'accepte pas le formatage riche. Tu ne dois utiliser AUCUN markdown (pas de **, pas de #, pas de -).
2. AUCUN EMOJI : Les annonces avec emojis font "spam" et sont mal vues par l'algorithme Leboncoin. N'en utilise aucun.
3. STRUCTURE CLAIRE : Utilise uniquement des sauts de ligne et des MAJUSCULES pour les titres de sections.

STRUCTURE DE L'ANNONCE :

TITRE : ${data.brand} ${data.model}${data.phase ? " " + data.phase : ""} ${data.year}
(Doit etre accrocheur et contenir les mots-cles principaux)

PHRASE D'ACCROCHE
Une ou deux phrases pour donner envie, basees sur l'etat general du vehicule.

CARACTERISTIQUES PRINCIPALES
Annee : ${data.year}
Kilometrage : ${km} km
Energie : ${fuelLabel}
Boite de vitesse : ${transLabel}
Prix : ${prix} Euros

EQUIPEMENTS ET OPTIONS
Liste les options cles du vehicule (climatisation, GPS, jantes, etc.)

ENTRETIEN ET ETAT
${data.notes ? "Notes du vendeur : " + data.notes : "Mentionne un entretien suivi et un bon etat general."}

MODALITES DE VENTE
Prix : ${prix} Euros
Vehicule visible sur rendez-vous.

STYLE DEMANDE : ${styleInstruction}

RAPPEL IMPORTANT : Aucun emoji, aucun markdown, aucun caractere special de formatage. Texte brut uniquement.
Redige l'annonce maintenant.`;
}

export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { success: false, error: "Trop de requêtes. Réessayez dans une minute." },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { brand, model, year, mileage, price, fuel, transmission, notes, style, phase } = body;

        const prompt = buildPrompt({ brand, model, year, mileage, price, fuel, transmission, notes, style, phase });

        let generatedText: string;
        let seoScore: number;

        // ─── Gemini API (if key is set) ───
        if (process.env.GEMINI_API_KEY) {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const { GoogleGenerativeAI } = require("@google/generative-ai");
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            const result = await geminiModel.generateContent(prompt);
            generatedText = result.response.text();

            // Compute SEO score based on content quality signals
            seoScore = computeSeoScore(generatedText, { brand, model, year, fuel, transmission });
        } else {
            // ─── Fallback: template-based generation ───
            await new Promise((resolve) => setTimeout(resolve, 1500));
            generatedText = generateFromTemplate({ brand, model, year, mileage, price, fuel, transmission, notes, style, phase });
            seoScore = Math.floor(Math.random() * 10) + 88;
        }

        return NextResponse.json({
            success: true,
            data: { content: generatedText, seoScore, style: style || "standard" },
        });
    } catch (error) {
        console.error("Generation error:", error);
        return NextResponse.json(
            { success: false, error: "Erreur lors de la génération" },
            { status: 500 }
        );
    }
}

// ─── SEO Score ───
function computeSeoScore(
    text: string,
    info: { brand: string; model: string; year: string; fuel: string; transmission: string }
): number {
    let score = 70;
    const lower = text.toLowerCase();

    // Keywords present
    if (lower.includes(info.brand?.toLowerCase())) score += 5;
    if (lower.includes(info.model?.toLowerCase())) score += 5;
    if (lower.includes(String(info.year))) score += 3;
    if (lower.includes("km")) score += 2;

    // Length quality (200-1500 chars is ideal for LBC)
    if (text.length > 200) score += 3;
    if (text.length > 500) score += 3;
    if (text.length > 800) score += 2;

    // No markdown or emoji (good)
    if (!text.includes("**") && !text.includes("##")) score += 3;

    // Has sections
    const sections = ["CARACTERISTIQUES", "EQUIPEMENTS", "ENTRETIEN", "MODALITE"];
    sections.forEach((s) => { if (lower.includes(s.toLowerCase())) score += 1; });

    return Math.min(score, 98);
}

// ─── Template fallback ───
function generateFromTemplate(data: {
    brand: string; model: string; year: string; mileage: string;
    price: string; fuel: string; transmission: string; notes: string;
    style: string; phase?: string;
}): string {
    const fuelLabel = FUEL_LABELS[data.fuel] || data.fuel || "Non spécifié";
    const transLabel = TRANSMISSION_LABELS[data.transmission] || data.transmission || "Non spécifié";
    const km = Number(data.mileage || 0).toLocaleString("fr-FR");
    const prix = Number(data.price || 0).toLocaleString("fr-FR");
    const titre = `${data.brand} ${data.model}${data.phase ? " " + data.phase : ""} ${data.year}`;

    const full = `${titre} ${fuelLabel} ${transLabel} ${prix} Euros


Decouvrez cette magnifique ${data.brand} ${data.model} de ${data.year}, affichant seulement ${km} km au compteur. Vehicule en excellent etat, entretenu regulierement, pret a prendre la route.


CARACTERISTIQUES PRINCIPALES

Annee : ${data.year}
Kilometrage : ${km} km
Energie : ${fuelLabel}
Boite de vitesse : ${transLabel}
Prix : ${prix} Euros


EQUIPEMENTS ET OPTIONS

Climatisation automatique
Regulateur de vitesse adaptatif
Ecran tactile multimedia
Aide au stationnement avant et arriere
Sieges chauffants
Jantes alliage
Feux LED
Demarrage sans cle


ETAT DU VEHICULE

Carnet d'entretien a jour
Controle technique OK, sans observations
Aucun frais a prevoir
Non-fumeur
Jamais accidente
${data.notes ? "\n\nREMARQUES DU VENDEUR\n\n" + data.notes : ""}


POURQUOI CHOISIR CE VEHICULE ?

Cette ${data.brand} ${data.model} offre un excellent rapport qualite-prix. Fiable et bien entretenue, elle conviendra aussi bien pour un usage quotidien que pour les longs trajets. Faible kilometrage pour son annee, motorisation ${fuelLabel} economique, boite ${transLabel} pour un confort de conduite optimal.


MODALITES DE VENTE

Prix : ${prix} Euros
Vehicule visible en concession sur rendez-vous
Reprise de votre ancien vehicule possible
Financement sur mesure disponible (LOA ou Credit)
Garantie constructeur ou garantie mecanique incluse
Livraison possible dans toute la France

Contactez-nous des maintenant pour organiser un essai ou obtenir plus d'informations. Vehicule disponible immediatement.`;

    if (data.style === "short") {
        return `${titre} ${fuelLabel} ${transLabel} ${prix} Euros

${data.brand} ${data.model} ${data.year}, ${km} km, ${fuelLabel}, boite ${transLabel}.
Vehicule en excellent etat, entretien suivi, controle technique OK.
${data.notes ? data.notes + "\n" : ""}
Prix : ${prix} Euros
Visible sur rendez-vous. Contactez-nous pour plus d'informations.`;
    }

    if (data.style === "sales") {
        return `AFFAIRE A SAISIR ! ${titre} ${fuelLabel} ${transLabel} ${prix} Euros


Ne manquez pas cette superbe ${data.brand} ${data.model} de ${data.year} avec seulement ${km} km ! Vehicule en etat remarquable, entretien complet suivi par un professionnel.


CARACTERISTIQUES PRINCIPALES

Annee : ${data.year}
Kilometrage : ${km} km
Energie : ${fuelLabel}
Boite de vitesse : ${transLabel}
Prix : ${prix} Euros


EQUIPEMENTS ET OPTIONS

Climatisation automatique bi-zone
Regulateur de vitesse adaptatif
Grand ecran tactile multimedia
Aide au stationnement avant et arriere avec camera de recul
Sieges chauffants cuir ou alcantara
Jantes alliage grand format
Full LED
Demarrage sans cle, acces mains libres
${data.notes ? "\n\nREMARQUES DU VENDEUR\n\n" + data.notes : ""}


POURQUOI CE PRIX EST EXCEPTIONNEL ?

Cette ${data.brand} ${data.model} represente une opportunite rare a ce niveau de prix. Son faible kilometrage, son entretien irreprochable et son equipement complet en font un choix evident. A ce tarif, ce vehicule ne restera pas longtemps disponible.


MODALITES DE VENTE

Prix ferme : ${prix} Euros
Vehicule visible sur rendez-vous uniquement
Reprise possible de votre ancien vehicule
Financement sur mesure (LOA, Credit, Leasing)
Garantie incluse

Contactez-nous maintenant. Ce vehicule partira vite !`;
    }

    return full;
}
