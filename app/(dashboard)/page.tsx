/**
 * Página de inicio: redirige automáticamente a /products.
 *
 * Server Component que usa redirect() de next/navigation.
 * El grupo (dashboard) no afecta la URL, así que esta página responde en "/".
 */
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/products");
}
