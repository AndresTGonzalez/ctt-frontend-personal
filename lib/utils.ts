/**
 * =============================================================================
 * ARCHIVO: lib/utils.ts — Utilidad cn() para clases Tailwind
 * =============================================================================
 *
 * cn() combina clsx + tailwind-merge:
 * - clsx: permite clases condicionales (cn("px-4", isActive && "bg-accent"))
 * - tailwind-merge: resuelve conflictos (cn("p-4", "p-6") → "p-6")
 *
 * Generado por shadcn init. Usado en todos los componentes ui/ y en la app.
 * =============================================================================
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
