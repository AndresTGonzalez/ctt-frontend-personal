"use client";

/**
 * Barra lateral de navegación principal.
 *
 * Es un Client Component porque usa usePathname() para resaltar
 * el ítem activo según la ruta actual.
 *
 * Clases Tailwind usadas aquí solo en el contenedor del sidebar;
 * los colores vienen de los tokens semánticos de shadcn (bg-sidebar, etc.).
 */
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex flex-col gap-1">
          <span className="truncate text-sm font-semibold">CTT Productos</span>
          <span className="truncate text-xs text-muted-foreground">
            App educativa CRUD
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menú</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive =
                  pathname === item.url ||
                  (item.url === "/products" && pathname.startsWith("/products") && pathname !== "/products/new");

                return (
                  <SidebarMenuItem key={item.title}>
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
      <SidebarRail />
    </Sidebar>
  );
}
