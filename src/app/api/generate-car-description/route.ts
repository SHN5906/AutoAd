import { NextRequest, NextResponse } from "next/server";
import { MOCK_GENERATED_AD } from "@/lib/mock-data";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { brand, model, year, mileage, price, fuel, transmission, notes, style } = body;

        // Simulate AI processing delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // -------------------------------------------
        // TODO: Replace with Gemini 3.1 Pro API call
        // -------------------------------------------
        // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        // const result = await model.generateContent([prompt, ...imagesParts]);
        // const generatedText = result.response.text();
        // -------------------------------------------

        const fuelLabels: Record<string, string> = {
            essence: "Essence",
            diesel: "Diesel",
            hybride: "Hybride",
            electrique: "Électrique",
            gpl: "GPL",
        };

        const transmissionLabels: Record<string, string> = {
            manuelle: "Manuelle",
            automatique: "Automatique",
        };

        let generatedText = MOCK_GENERATED_AD
            .replace(/\[BRAND\]/g, brand || "Marque")
            .replace(/\[MODEL\]/g, model || "Modèle")
            .replace(/\[YEAR\]/g, String(year || "2024"))
            .replace(/\[MILEAGE\]/g, Number(mileage || 0).toLocaleString("fr-FR"))
            .replace(/\[PRICE\]/g, Number(price || 0).toLocaleString("fr-FR"))
            .replace(/\[FUEL\]/g, fuelLabels[fuel] || fuel || "Non spécifié")
            .replace(/\[TRANSMISSION\]/g, transmissionLabels[transmission] || transmission || "Non spécifié")
            .replace(/\[NOTES\]/g, notes ? `\nREMARQUES DU VENDEUR\n${notes}\n` : "");

        // Adjust style
        if (style === "short") {
            // Keep only title, description, characteristics and contact
            const sections = generatedText.split("\n\n");
            generatedText = sections.slice(0, 4).join("\n\n");
            generatedText += "\n\nContactez-nous pour plus d'informations. Véhicule disponible immédiatement.";
        } else if (style === "sales") {
            generatedText = generatedText.replace(
                "Découvrez cette",
                "AFFAIRE A SAISIR ! Découvrez cette superbe"
            );
            generatedText += "\n\nPRIX EXCEPTIONNEL — Offre valable dans la limite du stock. N'attendez pas, ce véhicule partira vite !";
        }

        const seoScore = Math.floor(Math.random() * 10) + 88; // 88-97

        return NextResponse.json({
            success: true,
            data: {
                content: generatedText,
                seoScore,
                style: style || "standard",
            },
        });
    } catch (error) {
        console.error("Generation error:", error);
        return NextResponse.json(
            { success: false, error: "Erreur lors de la génération" },
            { status: 500 }
        );
    }
}
