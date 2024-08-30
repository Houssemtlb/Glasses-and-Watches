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
        <NavLink href="/">Home</NavLink>
        <NavLink href="/glasses">Glasses</NavLink>
        <NavLink href="/watches">Watches</NavLink>
        <NavLink href="/accessories">Accessories</NavLink>
      </Nav>
      <div className="flex-grow">
        {children}
      </div>
      <footer className="bg-primary w-full text-white flex flex-col p-4 space-y-1">
        <Link href="/">Home</Link>
        <Link href="/glasses">Glasses</Link>
        <Link href="/watches">Watches</Link>
        <Link href="/accessories">Accessories</Link>
      </footer>
    </div>
  )
}