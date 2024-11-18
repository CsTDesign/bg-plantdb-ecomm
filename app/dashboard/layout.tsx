import { ReactNode } from "react"
import DashboardNavigation from "../components/dashboard/DashboardNavigation"
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  CircleUser,
  MenuIcon
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"

export default async function DashboardLayout(
  { children }: {
    children: ReactNode
  }
) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || user.email !== "official.cstdesign@gmail.com") {
    return redirect("/")
  }
  
  return (
    <div className="flex flex-col lg:px-8 max-w-7xl mx-auto px-4 sm:px-6 w-full">
      <header className="bg-white border-b flex gap-4 h-16 items-center justify-between sticky top-0">
        <nav className="font-medium hidden lg:gap-6 md:flex md:flex-row md:gap-5 md:items-center md:text-sm">
          <DashboardNavigation />
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="md:hidden shrink-0"
              size="icon"
              variant="outline"
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col font-medium gap-6 mt-5 text-lg">
              <DashboardNavigation />
            </nav>
          </SheetContent>
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="rounded-full"
              size="icon"
              variant="secondary"
            >
              <CircleUser className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <LogoutLink>
                Logout
              </LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="my-5">
        {children}
      </main>
    </div>
  )
}
