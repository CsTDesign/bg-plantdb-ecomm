import Image from "next/image"
import Link from "next/link"
import allPlants from "@/public/allPlants.jpg"
import annuals from "@/public/annuals.jpg"
import grasses from "@/public/grasses.jpg"
import groundcover from "@/public/groundcover.jpg"
import perennials from "@/public/perennials.jpg"
import shrubs from "@/public/shrubs.jpg"
import trees from "@/public/trees.jpg"

export function CategorySelection() {
  return (
    <div className="py-24 sm:py-32">
      <div className="flex items-center justify-between">
        <h2 className="font-extrabold text-2xl tracking-tight">Browse plant material by category</h2>
      
        <Link
          className="font-semibold hover:text-primary/80 text-primary text-sm"
          href="/products/all"
        >
          View all products &rarr;
        </Link>
      </div>
      <p className="text-begin text-xs">
        Category images designed by{" "}
        <a
          href="https://www.freepik.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Freepik
        </a>
      </p>

      <div className="gap-y-6 grid grid-cols-1 lg:gap-8 mt-6 sm:gap-x-6 sm:grid-cols-2 sm:grid-rows-2">
        <div className="aspect-h-1 aspect-w-2 group overflow-hidden rounded-xl sm:aspect-w-1 sm:row-span-2">
          <Image
            alt="All Plants image"
            className="object-center object-cover"
            src={allPlants}
          />
          <div className="bg-gradient-to-b from-transparent opacity-55 to-black" />
          <div className="flex items-end p-6">
            <Link href="/products/all">
              <h3 className="font-semibold text-white">All Plants</h3>
              <p className="mt-1 text-sm text-white">Browse now</p>
            </Link>
          </div>
        </div>

        <div className="aspect-h-1 aspect-w-2 group overflow-hidden rounded-xl sm:aspect-w-1 sm:row-span-2">
          <Image
            alt="Annuals image"
            className="object-center object-cover"
            src={annuals}
          />
          <div className="bg-gradient-to-b from-transparent opacity-55 to-black" />
          <div className="flex items-end p-6">
            <Link href="/products/all">
              <h3 className="font-semibold text-white">Annuals</h3>
              <p className="mt-1 text-sm text-white">Browse now</p>
            </Link>
          </div>
        </div>

        <div className="aspect-h-1 aspect-w-2 group overflow-hidden rounded-xl sm:aspect-w-1 sm:row-span-2">
          <Image
            alt="Grasses image"
            className="object-center object-cover"
            src={grasses}
          />
          <div className="bg-gradient-to-b from-transparent opacity-55 to-black" />
          <div className="flex items-end p-6">
            <Link href="/products/all">
              <h3 className="font-semibold text-white">Grasses</h3>
              <p className="mt-1 text-sm text-white">Browse now</p>
            </Link>
          </div>
        </div>

        <div className="aspect-h-1 aspect-w-2 group overflow-hidden rounded-xl sm:aspect-w-1 sm:row-span-2">
          <Image
            alt="Groundcover image"
            className="object-center object-cover"
            src={groundcover}
          />
          <div className="bg-gradient-to-b from-transparent opacity-55 to-black" />
          <div className="flex items-end p-6">
            <Link href="/products/all">
              <h3 className="font-semibold text-white">Groundcover</h3>
              <p className="mt-1 text-sm text-white">Browse now</p>
            </Link>
          </div>
        </div>

        <div className="aspect-h-1 aspect-w-2 group overflow-hidden rounded-xl sm:aspect-w-1 sm:row-span-2">
          <Image
            alt="Perennials image"
            className="object-center object-cover"
            src={perennials}
          />
          <div className="bg-gradient-to-b from-transparent opacity-55 to-black" />
          <div className="flex items-end p-6">
            <Link href="/products/all">
              <h3 className="font-semibold text-white">Perennials</h3>
              <p className="mt-1 text-sm text-white">Browse now</p>
            </Link>
          </div>
        </div>

        <div className="aspect-h-1 aspect-w-2 group overflow-hidden rounded-xl sm:aspect-w-1 sm:row-span-2">
          <Image
            alt="Shrubs image"
            className="object-center object-cover"
            src={shrubs}
          />
          <div className="bg-gradient-to-b from-transparent opacity-55 to-black" />
          <div className="flex items-end p-6">
            <Link href="/products/all">
              <h3 className="font-semibold text-white">Shrubs</h3>
              <p className="mt-1 text-sm text-white">Browse now</p>
            </Link>
          </div>
        </div>

        <div className="aspect-h-1 aspect-w-2 group overflow-hidden rounded-xl sm:aspect-w-1 sm:row-span-2">
          <Image
            alt="Trees image"
            className="object-center object-cover"
            src={trees}
          />
          <div className="bg-gradient-to-b from-transparent opacity-55 to-black" />
          <div className="flex items-end p-6">
            <Link href="/products/all">
              <h3 className="font-semibold text-white">Trees</h3>
              <p className="mt-1 text-sm text-white">Browse now</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
