"use client";

/**
 * =============================================================================
 * ARCHIVO: components/app-sidebar.tsx — Barra lateral de navegación
 * =============================================================================
 *
 * Tipo: Client Component — usa usePathname() (hook del navegador)
 *
 * Responsabilidades:
 * - Mostrar enlaces de navegación (Productos, Crear producto)
 * - Resaltar el ítem activo según la ruta actual
 * =============================================================================
 */

/* --- SECCIÓN 1: Importaciones --- */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PackageIcon, PlusIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

/* --- SECCIÓN 2: Configuración del menú --- */
/**
 * Array estático con los ítems de navegación.
 * Cada ítem tiene: título visible, URL de destino e icono de lucide-react.
 */
const navItems = [
  {
    title: "Productos",
    url: "/products",
    icon: PackageIcon,
  },
  {
    title: "Crear producto",
    url: "/products/new",
    icon: PlusIcon,
  },
];

/* --- SECCIÓN 3: Componente Sidebar --- */
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  /** usePathname() devuelve la ruta actual, ej: "/products" o "/products/new" */
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Encabezado del sidebar con nombre de la app */}
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex flex-col gap-1">
          <span className="truncate text-sm font-semibold">CTT Productos</span>
          <span className="truncate text-xs text-muted-foreground">
            App educativa CRUD
          </span>
        </div>
      </SidebarHeader>

      {/* Grupo de navegación con los enlaces del menú */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menú</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                /**
                 * Lógica del ítem activo:
                 * - Coincidencia exacta con la URL del ítem
                 * - O está en /products/* excepto /products/new (solo "Productos" activo)
                 */
                const isActive =
                  pathname === item.url ||
                  (item.url === "/products" &&
                    pathname.startsWith("/products") &&
                    pathname !== "/products/new");

                return (
                  <SidebarMenuItem key={item.title}>
                    {/**
                     * SidebarMenuButton con render={<Link />} integra next/link
                     * para navegación del lado del cliente (sin recarga completa)
                     */}
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.title}
                      render={<Link href={item.url} />}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Rail: zona para redimensionar/colapsar el sidebar */}
      <SidebarRail />
    </Sidebar>
  );
}
