import { Nav, NavLink } from "@/components/Nav"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav>
        <NavLink href="/">Acceuil</NavLink>
        <NavLink href="/glasses">Lunettes</NavLink>
        <NavLink href="/watches">Montres</NavLink>
        <NavLink href="/accessories">Accessoires</NavLink>
      </Nav>
      <div className="flex-grow">
        {children}
      </div>
      <footer className="bg-primary w-full text-white flex flex-col p-4 space-y-1">
        <Link href="/">Acceuil</Link>
        <Link href="/glasses">Lunettes</Link>
        <Link href="/watches">Montres</Link>
        <Link href="/accessories">Accessoires</Link>
      </footer>
    </div>
  )
}