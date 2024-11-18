import { ProductCard } from "@/app/components/storefront/ProductCard"
import prisma from "@/app/lib/db"
import { notFound } from "next/navigation"

async function getData(productCategory: string) {
  switch (productCategory) {
    case "all": {
      const data = await prisma.product.findMany({
        where: {
          status: "published"
        },
        select: {
          id: true,
          name: true,
          description: true,
          images: true,
          price: true
        }
      })
      return {
        title: "All Plants",
        data: data
      }
    }
    case "annuals": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "annuals"
        },
        select: {
          id: true,
          name: true,
          description: true,
          images: true,
          price: true
        }
      })
      return {
        title: "Annuals",
        data: data
      }
    }
    case "grasses": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "grasses"
        },
        select: {
          id: true,
          name: true,
          description: true,
          images: true,
          price: true
        }
      })
      return {
        title: "Grasses",
        data: data
      }
    }
    case "groundcover": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "groundcover"
        },
        select: {
          id: true,
          name: true,
          description: true,
          images: true,
          price: true
        }
      })
      return {
        title: "Groundcover",
        data: data
      }
    }
    case "perennials": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "perennials"
        },
        select: {
          id: true,
          name: true,
          description: true,
          images: true,
          price: true
        }
      })
      return {
        title: "Perennials",
        data: data
      }
    }
    case "shrubs": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "shrubs"
        },
        select: {
          id: true,
          name: true,
          description: true,
          images: true,
          price: true
        }
      })
      return {
        title: "Shrubs",
        data: data
      }
    }
    case "trees": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "trees"
        },
        select: {
          id: true,
          name: true,
          description: true,
          images: true,
          price: true
        }
      })
      return {
        title: "Trees",
        data: data
      }
    }
    default: {
      return notFound()
    }
  }
}

export default async function CategoriesPage({ params }: {
  params: {
    name: string
  }
}) {
  const {
    data,
    title
  } = await getData(params.name)
  
  return (
    <section>
      <h1 className="font-semibold my-5 text-3xl">{title}</h1>
      <div className="gap-5 grid lg:grid-cols-3 md:grid-cols-2">
        {
          data.map((item) => (
            <ProductCard
              item={item}
              key={item.id}
            />
          ))
        }
      </div>
    </section>
  )
}
