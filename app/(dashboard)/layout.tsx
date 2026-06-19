/**
 * Layout del dashboard con barra lateral.
 *
 * Server Component: no necesita interactividad propia.
 * Envuelve todas las rutas del grupo (dashboard) con SidebarProvider.
 *
 * Clases Tailwind del shell:
 * - min-h-svh: altura mínima del viewport (small viewport height)
 * - flex flex-1 flex-col: columna flexible para el área de contenido
 * - gap-4 p-4 md:p-6: espaciado responsive (más padding en pantallas medianas)
 */
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex min-h-svh w-full flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
          />
          <span className="text-sm font-medium">Gestión de productos</span>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
