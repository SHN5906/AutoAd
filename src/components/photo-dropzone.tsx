"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus, X, Upload } from "lucide-react";
import Image from "next/image";

interface PhotoDropzoneProps {
    images: File[];
    onImagesChange: (images: File[]) => void;
    maxImages?: number;
}

export default function PhotoDropzone({
    images,
    onImagesChange,
    maxImages = 10,
}: PhotoDropzoneProps) {
    const [previews, setPreviews] = useState<string[]>([]);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const newFiles = [...images, ...acceptedFiles].slice(0, maxImages);
            onImagesChange(newFiles);
            const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
            setPreviews((prev) => {
                prev.forEach((url) => URL.revokeObjectURL(url));
                return newPreviews;
            });
        },
        [images, maxImages, onImagesChange]
    );

    const removeImage = (index: number) => {
        const newFiles = images.filter((_, i) => i !== index);
        onImagesChange(newFiles);
        URL.revokeObjectURL(previews[index]);
        setPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
        maxFiles: maxImages - images.length,
        disabled: images.length >= maxImages,
    });

    return (
        <div className="space-y-3">
            <div
                {...getRootProps()}
                className={`relative rounded-xl border border-dashed p-6 text-center cursor-pointer transition-all duration-200 ${isDragActive
                        ? "border-primary/60 bg-primary/[0.03]"
                        : images.length >= maxImages
                            ? "border-border/30 bg-muted/10 cursor-not-allowed opacity-40"
                            : "border-border/50 bg-white/[0.01] hover:border-border hover:bg-white/[0.02]"
                    }`}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${isDragActive ? "bg-primary/10 text-primary" : "bg-white/[0.03] text-muted-foreground/50"
                        }`}>
                        {isDragActive ? <Upload className="w-4 h-4" /> : <ImagePlus className="w-4 h-4" />}
                    </div>
                    <div>
                        <p className="text-xs font-medium">
                            {isDragActive ? "Déposez vos photos" : "Glissez-déposez ou cliquez pour ajouter"}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                            JPG, PNG, WebP · {images.length}/{maxImages}
                        </p>
                    </div>
                </div>
            </div>

            {previews.length > 0 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {previews.map((preview, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden group border border-border/30">
                            <Image src={preview} alt={`Photo ${index + 1}`} fill className="object-cover" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                                <button
                                    onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                                    className="w-6 h-6 rounded-full bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
