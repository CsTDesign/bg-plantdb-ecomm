import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { DashboardStats } from "../components/dashboard/DashboardStats"
import { RecentSales } from "../components/dashboard/RecentSales"
import Chart from "../components/dashboard/Chart"
import prisma from "../lib/db"
import { unstable_noStore as noStore } from "next/cache"

async function getData() {
  const now = new Date()
  const sevenDaysAgo = new Date()

  sevenDaysAgo.setDate(now.getDate() - 7)
  
  const data = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: sevenDaysAgo
      }
    },
    select: {
      amount: true,
      createdAt: true
    },
    orderBy: {
      createdAt: "asc"
    }
  })

  const result = data.map((item) => ({
    date: new Intl.DateTimeFormat("en-US").format(item.createdAt),
    revenue: item.amount / 100
  }))

  return result
}

export default async function Dashboard() {
  noStore()
  const data = await getData()
  
  return (
    <>
      <DashboardStats />

      <div className="gap-4 grid lg:grid-cols-2 md:gap-8 mt-10 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>as of last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart data={data} />
          </CardContent>
        </Card>

        <RecentSales />
      </div>
    </>
  )
}
