import { deleteProduct } from "@/app/actions"
import { SubmitButton } from "@/app/components/SubmitButtons"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription, 
  CardFooter,
  CardHeader, 
  CardTitle
} from "@/components/ui/card"
import Link from "next/link"

export default function DeleteRoute({ params }: {
  params: {
    id: string
  }
}) {
  return (
    <div className="flex h-[80vh] items-center justify-center w-full">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-red-500 uppercase">Are you sure?</CardTitle>
          <CardDescription className="text-center">
            The product and its data will be permanently deleted from our servers.<br />
            This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between w-full">
          <Button
            asChild
            variant="secondary"
          >
            <Link href="/dashboard/products">Cancel</Link>
          </Button>
          <form action={deleteProduct}>
            <input
              name="productId"
              type="hidden"
              value={params.id}
            />
            <SubmitButton
              text="Delete Product"
              variant="destructive"
            />
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}