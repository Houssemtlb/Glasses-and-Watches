import { Nav, NavLink } from "@/components/Nav"

export const dynamic = "force-dynamic" //avoids caching problms, forces to not cache

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Nav>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Produits</NavLink>
        <NavLink href="/admin/users">Clients</NavLink>
        <NavLink href="/admin/orders">Commandes</NavLink>
        <NavLink href="/admin/diaporama">Diaporama</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  )
}