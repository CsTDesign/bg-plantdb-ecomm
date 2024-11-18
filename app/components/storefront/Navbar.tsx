import Link from "next/link"
import { NavbarLinks } from "./NavbarLinks"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { ShoppingCartIcon } from "lucide-react"
import { UserDropdown } from "./UserDropdown"
import { Button } from "@/components/ui/button"
import { Cart } from "@/app/lib/interfaces"
import { redis } from "@/app/lib/redis"
import {
  LoginLink,
  RegisterLink
} from "@kinde-oss/kinde-auth-nextjs/components"

export async function Navbar() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const cart: Cart | null = await redis.get(`cart-${user.id}`)

  const total = cart?.items.reduce(
    (sum, item) => sum + item.quantity, 0
  ) || 0

  return (
    <nav className="flex items-center justify-between lg:px-8 max-w-7xl mx-auto px-4 py-5 sm:px-6 w-full">
      <div className="flex items-center">
        <Link href="/">
          <h1 className="font-bold lg:text-3xl text-black text-xl">
            Baxter Gardens <span className="text-primary">Nurser-E</span>
          </h1>
        </Link>
        <NavbarLinks />
      </div>

      <div className="flex items-center">
        {
          user ? (
            <>
              <Link
                className="flex group items-center mr-2 p-2"
                href="/cart"
              >
                <ShoppingCartIcon className="group-hover:text-gray-500 h-6 text-gray-400 w-6" />
                <span className="font-medium group-hover:text-gray-800 ml-2 text-gray-700 text-sm">{total}</span>
              </Link>

              <UserDropdown
                email={user.email as string}
                name={user.given_name as string}
                userImage={user.picture ?? `https://avatar.vercel.sh/${user.given_name}`}
              />
            </>
          ) : (
            <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2">
              <Button
                asChild
                variant="ghost"
              >
                <LoginLink>Login</LoginLink>
              </Button>
              <span className="bg-gray-200 h-6 w-px"></span>
              <Button
                asChild
                variant="ghost"
              >
                <RegisterLink>Create Account</RegisterLink>
              </Button>
            </div>
          )
        }
      </div>
    </nav>
  )
}
