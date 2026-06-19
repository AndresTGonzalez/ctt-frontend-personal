/**
 * =============================================================================
 * ARCHIVO: app/(dashboard)/page.tsx — Página de inicio (/)
 * =============================================================================
 *
 * Responde en la ruta raíz "/". No muestra contenido: redirige a /products.
 *
 * Tipo: Server Component
 * =============================================================================
 */

import { redirect } from "next/navigation";

export default function HomePage() {
  /** redirect() detiene la ejecución y envía al usuario a /products */
  redirect("/products");
}
