import prisma from "@/app/lib/db"
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

async function getData() {
  const data = await prisma.order.findMany({
    select: {
      amount: true,
      id: true,
      User: {
        select: {
          firstName: true,
          email: true,
          profileImage: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 7
  })

  return data
}

export async function RecentSales() {
  const data = await getData()
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {
          data.map((item) => (
            <div
              className="flex gap-4 items-center"
              key={item.id}
            >
              <Avatar className="h-9 hidden sm:flex w-9">
                <AvatarImage
                  alt="Avatar image"
                  src={item.User?.profileImage}
                />
                <AvatarFallback>
                  {item.User?.firstName.slice(0, 3)}
                </AvatarFallback>
              </Avatar>
              <div className="gap-1 grid">
                <p className="font-medium text-sm">{item.User?.firstName}</p>
                <p className="text-muted-foreground text-sm">{item.User?.email}</p>
              </div>
              <p className="font-medium ml-auto">
                +${new Intl.NumberFormat("en-US").format(item.amount / 100)}
              </p>
            </div>
          ))
        }
      </CardContent>
    </Card>
  )
}
