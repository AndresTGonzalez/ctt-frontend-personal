/**
 * =============================================================================
 * ARCHIVO: app/layout.tsx — Layout raíz de la aplicación
 * =============================================================================
 *
 * Este es el layout más externo de Next.js App Router. Envuelve TODAS las
 * páginas de la app. Se ejecuta una sola vez y sus hijos cambian según la ruta.
 *
 * Tipo: Server Component (no tiene "use client")
 * =============================================================================
 */

/* --- SECCIÓN 1: Importaciones --- */
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

/* --- SECCIÓN 2: Configuración de fuente (next/font) --- */
/**
 * next/font/google optimiza la carga de Google Fonts:
 * - Descarga la fuente en build time (sin request extra en runtime)
 * - variable: expone --font-sans para que Tailwind/shadcn la usen
 * - display: "swap" evita texto invisible mientras carga la fuente
 */
const openSans = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

/* --- SECCIÓN 3: Metadata SEO --- */
/** Metadata estática exportada: título y descripción para el <head> del HTML */
export const metadata: Metadata = {
  title: "CTT Productos — App educativa CRUD",
  description:
    "Aplicación educativa de gestión de productos con Next.js 16, Tailwind CSS v4 y shadcn/ui",
};

/* --- SECCIÓN 4: Componente Layout --- */
/**
 * Estructura HTML:
 * - <html lang="es">: accesibilidad y SEO en español; openSans.variable inyecta --font-sans
 * - <body>: openSans.className aplica Open Sans; TooltipProvider para tooltips del Sidebar
 * - Toaster: contenedor global de notificaciones toast (sonner)
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${openSans.variable} h-full antialiased`}>
      <body className={`${openSans.className} flex min-h-full flex-col`}>
        <TooltipProvider>
          {children}
          <Toaster richColors position="top-right" />
        </TooltipProvider>
      </body>
    </html>
  );
}
