import { type ReactNode } from "react"
import { Navbar } from "../components/storefront/Navbar"
import { Footer } from "../components/storefront/Footer"

export default function StorefrontLayout({ children }: {
  children: ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="lg:px-8 max-w-7xl mx-auto px-4 sm:px-6">
        {children}
      </main>
      <Footer />
    </>
  )
}
