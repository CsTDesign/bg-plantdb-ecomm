import prisma from "@/app/lib/db"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  DollarSign,
  Package,
  ShoppingCart,
  Users2
} from "lucide-react"

async function getData() {
  const [
    user,
    products,
    order
  ] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true
      }
    }),
    prisma.product.findMany({
      select: {
        id: true
      }
    }),
    prisma.order.findMany({
      select: {
        amount: true
      }
    })
  ])
  
  return {
    user,
    products,
    order
  }
}

export async function DashboardStats() {
  const {
    user,
    products,
    order
  } = await getData()

  const totalAmount = order.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue.amount
    }, 0
  )
  
  return (
    <div className="gap-4 grid lg:grid-cols-4 md:gap-8 md:grid-cols-2">
      <Card className="bg-white overflow-hidden p-2 relative rounded-lg shadow-lg">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="font-bold mb-1 text-green-400 text-xl uppercase">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-bold text-2xl">
            ${new Intl.NumberFormat("en-US").format(totalAmount / 100)}
          </p>
          <p className="text-muted-foreground text-xs">Based on 100 charges</p>
        </CardContent>
        <div className="absolute bg-gradient-to-br from-green-600 inset-0 opacity-30 to-green-300" />
        <div className="absolute -bottom-4 opacity-50 -right-4 text-green-800">
          <DollarSign className="h-32 w-32" />
        </div>
      </Card>

      <Card className="bg-white overflow-hidden p-2 relative rounded-lg shadow-lg">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="font-semibold mb-1 text-green-400 text-xl uppercase">Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-bold text-2xl">+{order.length}</p>
        </CardContent>
        <div className="absolute bg-gradient-to-br from-green-600 inset-0 opacity-30 to-green-300" />
        <div className="absolute -bottom-4 opacity-50 -right-4 text-green-800">
          <ShoppingCart className="h-32 w-32" />
        </div>
      </Card>

      <Card className="bg-white overflow-hidden p-2 relative rounded-lg shadow-lg">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="font-semibold mb-1 text-green-400 text-xl uppercase">Total Products</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-bold text-2xl">{products.length}</p>
        </CardContent>
        <div className="absolute bg-gradient-to-br from-green-600 inset-0 opacity-30 to-green-300" />
        <div className="absolute -bottom-4 opacity-50 -right-4 text-green-800">
          <Package className="h-32 w-32" />
        </div>
      </Card>

      <Card className="bg-white overflow-hidden p-2 relative rounded-lg shadow-lg">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="font-semibold mb-1 text-green-400 text-xl uppercase">Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-bold text-2xl">{user.length}</p>
        </CardContent>
        <div className="absolute bg-gradient-to-br from-green-600 inset-0 opacity-30 to-green-300" />
        <div className="absolute -bottom-4 opacity-50 -right-4 text-green-800">
          <Users2 className="h-32 w-32" />
        </div>
      </Card>
    </div>
  )
}
