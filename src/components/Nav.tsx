"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, useEffect, useState } from "react";

export function Nav({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the navbar menu for mobile screens
  const toggleMenu = () => setIsOpen(!isOpen);


  return (
    <nav
      className={cn(
        "bg-primary text-primary-foreground flex md:flex-row justify-between items-center py-3 h-auto overflow-hidden",
        isOpen ? "h-auto items-center flex-col" : ""
      )}
    >
      <div className={cn("flex items-center justify-between w-full px-4 ")}>
        {/* Logo or branding */}
        <div className="text-2xl font-bold">Glasses&Watches</div>

        {/* Hamburger menu icon (visible on mobile) */}
        <button
          onClick={toggleMenu}
          className="block md:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6 text-primary-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Links - Hidden on small screens unless menu is toggled */}
      <div
        className={cn(
          "flex flex-col md:flex-row w-full h-full md:w-auto",
          isOpen ? "py-2" : "hidden mr-12",
          "md:block"
        )}
        onClick={() => setIsOpen(false)}>
        {children}
      </div>
    </nav>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(false); // Close the menu when a link is clicked
  };

  return (
    <Link
      {...props}
      className={cn(
        "p-3 md:p-5 hover:bg-white hover:text-primary focus-visible:bg-secondary focus-visible:text-secondary-foreground w-full",
        pathname === props.href && "bg-background text-foreground"
      )}
      onClick={handleClick} // Handle click to close menu
    />
  );
}
