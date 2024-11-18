import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"

interface iAppProps {
  email: string
  name: string
  userImage: string
}

export function UserDropdown({
  email, name, userImage
}: iAppProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="h-10 relative rounded-full w-10"
          variant="ghost"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage
              alt="User image"
              src={userImage}
            />
            <AvatarFallback>
              {name.slice(0, 3)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56"
        forceMount
      >
        <DropdownMenuLabel className="flex flex-col space-y-1">
          <p className="font-medium leading-none text-sm">{name}</p>
          <p className="leading-none text-muted-foreground text-xs">{email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutLink>Logout</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
