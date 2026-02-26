"use client";

import { Vehicle, Generation } from "@/lib/mock-data";

const VEHICLES_KEY = "autoad-vehicles";
const GENERATIONS_KEY = "autoad-generations";

function get<T>(key: string): T[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function set<T>(key: string, data: T[]) {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(data));
}

// ─── Vehicles ───

export function getVehicles(): Vehicle[] {
    return get<Vehicle>(VEHICLES_KEY);
}

export function getVehicle(id: string): Vehicle | undefined {
    return getVehicles().find((v) => v.id === id);
}

export function saveVehicle(vehicle: Omit<Vehicle, "id" | "createdAt">): Vehicle {
    const vehicles = getVehicles();
    const newVehicle: Vehicle = {
        ...vehicle,
        id: `v-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        createdAt: new Date().toISOString().split("T")[0],
    };
    vehicles.unshift(newVehicle);
    set(VEHICLES_KEY, vehicles);
    return newVehicle;
}

export function updateVehicle(id: string, updates: Partial<Vehicle>) {
    const vehicles = getVehicles();
    const idx = vehicles.findIndex((v) => v.id === id);
    if (idx !== -1) {
        vehicles[idx] = { ...vehicles[idx], ...updates };
        set(VEHICLES_KEY, vehicles);
    }
}

export function deleteVehicle(id: string) {
    set(VEHICLES_KEY, getVehicles().filter((v) => v.id !== id));
    // Also delete associated generations
    set(GENERATIONS_KEY, getGenerations().filter((g) => g.vehicleId !== id));
}

// ─── Generations ───

export function getGenerations(): Generation[] {
    return get<Generation>(GENERATIONS_KEY);
}

export function getGenerationsForVehicle(vehicleId: string): Generation[] {
    return getGenerations().filter((g) => g.vehicleId === vehicleId);
}

export function saveGeneration(gen: Omit<Generation, "id" | "createdAt">): Generation {
    const generations = getGenerations();
    const newGen: Generation = {
        ...gen,
        id: `g-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        createdAt: new Date().toISOString().split("T")[0],
    };
    generations.unshift(newGen);
    set(GENERATIONS_KEY, generations);
    return newGen;
}

// ─── Stats ───

export function getStats() {
    const vehicles = getVehicles();
    const now = new Date();
    const thisMonth = vehicles.filter((v) => {
        const d = new Date(v.createdAt);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });

    const generations = getGenerations();
    const avgSeo = generations.length > 0
        ? Math.round(generations.reduce((sum, g) => sum + g.seoScore, 0) / generations.length)
        : 0;

    return {
        totalAds: vehicles.length,
        thisMonth: thisMonth.length,
        avgSeoScore: avgSeo,
        totalViews: vehicles.length * 73, // Simulated
    };
}

// ─── Init with sample data if empty ───

export function initSampleData() {
    if (typeof window === "undefined") return;
    const vehicles = getVehicles();
    if (vehicles.length > 0) return; // Already has data

    const sampleVehicles: Vehicle[] = [
        { id: "v1", brand: "BMW", model: "Série 3", year: 2022, mileage: 35000, price: 34900, fuel: "diesel", transmission: "automatique", images: [], createdAt: "2026-02-25", status: "published" },
        { id: "v2", brand: "Mercedes-Benz", model: "Classe A", year: 2023, mileage: 18000, price: 29500, fuel: "essence", transmission: "automatique", images: [], createdAt: "2026-02-24", status: "published" },
        { id: "v3", brand: "Peugeot", model: "3008", year: 2021, mileage: 52000, price: 24900, fuel: "hybride", transmission: "automatique", images: [], createdAt: "2026-02-23", status: "draft" },
        { id: "v4", brand: "Audi", model: "A4 Avant", year: 2022, mileage: 41000, price: 38700, fuel: "diesel", transmission: "automatique", images: [], createdAt: "2026-02-22", status: "published" },
        { id: "v5", brand: "Tesla", model: "Model 3", year: 2023, mileage: 15000, price: 41900, fuel: "electrique", transmission: "automatique", images: [], createdAt: "2026-02-20", status: "published" },
    ];

    const sampleGenerations: Generation[] = [
        { id: "g1", vehicleId: "v1", content: "BMW Série 3 320d 2022...", style: "standard", seoScore: 94, createdAt: "2026-02-25" },
        { id: "g2", vehicleId: "v2", content: "Mercedes-Benz Classe A 200 2023...", style: "standard", seoScore: 91, createdAt: "2026-02-24" },
        { id: "g3", vehicleId: "v4", content: "Audi A4 Avant 40 TDI 2022...", style: "standard", seoScore: 89, createdAt: "2026-02-22" },
        { id: "g4", vehicleId: "v5", content: "Tesla Model 3 Long Range 2023...", style: "standard", seoScore: 96, createdAt: "2026-02-20" },
    ];

    set(VEHICLES_KEY, sampleVehicles);
    set(GENERATIONS_KEY, sampleGenerations);
}
