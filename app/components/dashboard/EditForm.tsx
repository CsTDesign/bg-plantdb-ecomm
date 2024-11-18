"use client"

import { categories } from "@/app/lib/categories"
import { UploadDropzone } from "@/app/lib/uploadthing"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription, 
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  ChevronLeft,
  XIcon
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SubmitButton } from "../SubmitButtons"
import { useState } from "react"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { productSchema } from "@/app/lib/zodSchemas"
import { useFormState } from "react-dom"
import { editProduct } from "@/app/actions"
import { type $Enums } from "@prisma/client"

interface iAppProps {
  data: {
    id: string
    name: string
    description: string
    status: $Enums.ProductStatus
    price: number
    images: string[]
    category: $Enums.Category
    isFeatured: boolean
  }
}

export function EditForm({ data }: iAppProps) {
  const [
    images,
    setImages
  ] = useState<string[]>(data.images)

  const [
    lastResult,
    action
  ] = useFormState(editProduct, undefined)
  
  const [
    form,
    fields
  ] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: productSchema
      })
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput"
  })

  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }
  
  return (
    <form
      action={action}
      id={form.id}
      onSubmit={form.onSubmit}
    >
      <input
        name="productId"
        type="hidden"
        value={data.id}
      />
      <div className="flex gap-4 items-center">
        <Button
          asChild
          size="icon"
          variant="outline"
        >
          <Link href="/dashboard/products">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="font-semibold text-xl tracking-tight">
          Edit Product
        </h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>Update existing product here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input
                className="w-full"
                defaultValue={data.name}
                key={fields.name.key}
                name={fields.name.name}
                placeholder="Product name"
                type="text"
              />
              <p className="text-red-500">{fields.name.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Description</Label>
              <Textarea
                defaultValue={data.description}
                key={fields.description.key}
                name={fields.description.name}
                placeholder="Describe product here..."
              />
              <p className="text-red-500">{fields.description.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Price</Label>
              <Input
                defaultValue={data.price}
                key={fields.price.key}
                name={fields.price.name}
                placeholder="Price in $"
                type="number"
              />
              <p className="text-red-500">{fields.price.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Featured Product</Label>
              <Switch
                defaultChecked={data.isFeatured}
                key={fields.isFeatured.key}
                name={fields.isFeatured.name}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label>Status</Label>
              <Select
                defaultValue={data.status}
                key={fields.status.key}
                name={fields.status.name}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.status.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Category</Label>
              <Select
                defaultValue={data.category}
                key={fields.category.key}
                name={fields.category.name}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {
                    categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.name}
                      >
                        {category.title}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.category.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <input
                defaultValue={fields.images.initialValue as any}
                key={fields.images.key}
                name={fields.images.name}
                type="hidden"
                value={images}
              />
              {
                images.length > 0 ? (
                  <div className="flex gap-5">
                    {
                      images.map((image, index) => (
                        <div
                          className="h-[100px] relative w-[100px]"
                          key={index}
                        >
                          <Image
                            alt="Product image"
                            className="border h-full object-cover rounded-lg w-full"
                            height={100}
                            src={image}
                            width={100}
                          />
                          <button
                            className="absolute bg-red-500 p-2 -right-3 rounded-lg text-white -top-3"
                            onClick={() => handleDelete(index)}
                            type="button"
                          >
                            <XIcon className="h-3 w-3" />
                          </button>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setImages(res.map((r) => r.url))
                    }}
                    onUploadError={() => {
                      alert("Something went wrong. Please try again later.")
                    }}
                  />
                )
              }
              <p className="text-red-500">{fields.images.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Edit Product" />
        </CardFooter>
      </Card>
    </form>
  )
}
