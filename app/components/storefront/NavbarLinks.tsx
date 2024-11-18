"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const navbarLinks = [
  {
    id: 0,
    name: "Home",
    href: "/"
  },
  {
    id: 1,
    name: "All Plants",
    href: "/products/all"
  },
  {
    id: 2,
    name: "Annuals",
    href: "/products/annuals"
  },
  {
    id: 3,
    name: "Grasses",
    href: "/products/grasses"
  },
  {
    id: 4,
    name: "Groundcover",
    href: "/products/groundcover"
  },
  {
    id: 5,
    name: "Perennials",
    href: "/products/perennials"
  },
  {
    id: 6,
    name: "Shrubs",
    href: "/products/shrubs"
  },
  {
    id: 7,
    name: "Trees",
    href: "/products/trees"
  }
]

export function NavbarLinks() {
  const location = usePathname()
  
  return (
    <div className="gap-x-2 hidden items-center justify-center md:flex ml-5">
      {
        navbarLinks.map((item) => (
          <Link
            className={cn(
              location === item.href
                ? "bg-muted"
                : "hover:bg-muted hover:bg-opacity-75",
              "font-medium group p-2 rounded-md"
            )}
            href={item.href}
            key={item.id}
          >
            {item.name}
          </Link>
        ))
      }
    </div>
  )
}
