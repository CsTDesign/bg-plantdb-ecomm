"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  {
    name: "Dashboard",
    href: "/dashboard"
  },
  {
    name: "Orders",
    href: "/dashboard/orders"
  },
  {
    name: "Products",
    href: "/dashboard/products"
  },
  {
    name: "Banner",
    href: "/dashboard/banner"
  },
]

export default function DashboardNavigation() {
  const pathname = usePathname()

  return (
    <>
      {
        links.map((link) => (
          <Link
            className={
              cn(link.href === pathname ? "text-green-500" : "text-muted-foreground")
            }
            href={link.href}
            key={link.href}
          >
            {link.name}
          </Link>
        ))
      }
    </>
  )
}
