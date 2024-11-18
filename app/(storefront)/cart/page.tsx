import {
  checkout,
  deleteItem
} from "@/app/actions"
import {
  CheckoutButton,
  DeleteItemButton
} from "@/app/components/SubmitButtons"
import { Cart } from "@/app/lib/interfaces"
import { redis } from "@/app/lib/redis"
import { Button } from "@/components/ui/button"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function CartRoute() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    redirect("/")
  }

  const cart: Cart | null = await redis.get(`cart-${user.id}`)

  let totalPrice = 0

  cart?.items.forEach((item) => {
    totalPrice += item.price * item.quantity
  })
  
  return (
    <div className="max-w-2xl min-h-[55vh] mt-10 mx-auto">
      {
        cart?.items.length === 0 ? (
          <div className="border border-dashed flex flex-col items-center justify-center min-h-[400px] mt-20 p-8 rounded-lg text-center">
            <div className="bg-primary/10 flex h-20 items-center justify-center rounded-full w-20">
              <ShoppingCart className="h-10 text-primary w-10" />
            </div>

            <h2 className="font-semibold mt-6 text-xl">
              Your cart is empty!
            </h2>
            <p className="leading-6 max-w-sm mb-8 mt-2 mx-auto text-center text-muted-foreground text-sm">
              You have not added any products to your cart yet.
            </p>

            <Button asChild>
              <Link href="/">Shop Now!</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-y-10">
            {cart?.items.map((item) => (
              <div
                className="flex"
                key={item.id}
              >
                <div className="h-24 relative sm:h-32 sm:w-32 w-24">
                  <Image
                    alt="Product image"
                    className="object-cover rounded-md"
                    fill
                    src={item.imageString}
                  />
                </div>
                <div className="flex font-medium justify-between ml-5 w-full">
                  <p>{item.name}</p>
                  <div className="flex flex-col h-full justify-between">
                    <div className="flex gap-x-2 items-center">
                      <p>{item.quantity} x</p>
                      <p>${item.price}</p>
                    </div>

                    <form
                      action={deleteItem}
                      className="text-end"
                    >
                      <input
                        name="productId"
                        type="hidden"
                        value={item.id}
                      />
                      <DeleteItemButton />
                    </form>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-10">
              <div className="flex font-medium items-center justify-between">
                <p>Subtotal:</p>
                <p>${new Intl.NumberFormat("en-US").format(totalPrice)}</p>
              </div>

              <form action={checkout}>
                <CheckoutButton />
              </form>
            </div>
          </div>
        )
      }
    </div>
  )
}
