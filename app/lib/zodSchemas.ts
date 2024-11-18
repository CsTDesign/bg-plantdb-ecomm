import { z } from "zod"

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum([
    "draft",
    "published",
    "archived"
  ]),
  price: z.number().min(1),
  images: z.array(z.string()).min(1, "At least one image required"),
  category: z.enum([
    "annuals",
    "grasses",
    "groundcover",
    "perennials",
    "shrubs",
    "trees"
  ]),
  isFeatured: z.boolean().optional()
})

export const bannerSchema = z.object({
  title: z.string(),
  imageString: z.string()
})
