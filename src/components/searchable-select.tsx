"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
    value: string;
    label: string;
    icon?: React.ReactNode;
    sublabel?: string;
}

interface SearchableSelectProps {
    options: Option[];
    value: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    disabled?: boolean;
    id?: string;
    className?: string;
}

export default function SearchableSelect({
    options,
    value,
    onValueChange,
    placeholder = "Sélectionner...",
    searchPlaceholder = "Rechercher...",
    emptyMessage = "Aucun résultat.",
    disabled = false,
    id,
    className,
}: SearchableSelectProps) {
    const [open, setOpen] = useState(false);
    const selected = options.find((o) => o.value === value);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                    id={id}
                    disabled={disabled}
                    className={cn(
                        "flex h-9 w-full items-center justify-between rounded-md border border-border/50 bg-white/[0.02] px-3 text-sm transition-all",
                        "hover:border-border focus:border-primary/40 focus:ring-1 focus:ring-primary/15 focus:outline-none",
                        disabled && "opacity-50 cursor-not-allowed",
                        !selected && "text-muted-foreground/40",
                        className
                    )}
                >
                    <span className="truncate flex items-center gap-1.5">
                        {selected ? (
                            <>
                                {selected.icon}
                                {selected.label}
                            </>
                        ) : (
                            placeholder
                        )}
                    </span>
                    <ChevronsUpDown className="w-3 h-3 text-muted-foreground/40 flex-shrink-0 ml-2" />
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                <Command className="bg-popover">
                    <CommandInput placeholder={searchPlaceholder} className="h-9 text-sm" />
                    <CommandList className="max-h-[240px]">
                        <CommandEmpty className="py-4 text-center text-xs text-muted-foreground">{emptyMessage}</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={`${option.label} ${option.sublabel || ""}`}
                                    onSelect={() => { onValueChange(option.value); setOpen(false); }}
                                    className="flex items-center gap-2 text-sm cursor-pointer"
                                >
                                    {option.icon}
                                    <div className="flex-1 min-w-0">
                                        <span>{option.label}</span>
                                        {option.sublabel && (
                                            <span className="ml-1.5 text-[10px] text-muted-foreground">{option.sublabel}</span>
                                        )}
                                    </div>
                                    <Check className={cn("w-3.5 h-3.5 text-primary flex-shrink-0", value === option.value ? "opacity-100" : "opacity-0")} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
