/**
 * =============================================================================
 * ARCHIVO: app/(dashboard)/layout.tsx — Layout del dashboard con sidebar
 * =============================================================================
 *
 * Los paréntesis en (dashboard) crean un "grupo de rutas": organizan archivos
 * sin afectar la URL. /products sigue siendo /products, no /dashboard/products.
 *
 * Este layout envuelve todas las páginas del grupo: /, /products, /products/new
 *
 * Tipo: Server Component
 * =============================================================================
 */

/* --- SECCIÓN 1: Importaciones --- */
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

/* --- SECCIÓN 2: Componente Layout --- */
/**
 * SidebarProvider comparte el estado del sidebar (abierto/cerrado) entre
 * AppSidebar y SidebarTrigger mediante Context de React.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      {/* Barra lateral de navegación (Client Component) */}
      <AppSidebar />

      {/**
       * SidebarInset: área de contenido principal a la derecha del sidebar.
       * Clases Tailwind:
       * - min-h-svh: altura mínima = viewport completo
       * - flex flex-1 flex-col: columna flexible que ocupa el espacio restante
       */}
      <SidebarInset className="flex min-h-svh w-full flex-1 flex-col">
        {/* Header: barra superior con botón para colapsar el sidebar */}
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
          />
          <span className="text-sm font-medium">Gestión de productos</span>
        </header>

        {/**
         * main: contenido de cada página (products/page.tsx, products/new, etc.)
         * gap-4 p-4 md:p-6 → espaciado responsive (más padding en pantallas md+)
         */}
        <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
