"use client"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { addProduct, updateProduct } from "../../_actions/products"
import { useFormState, useFormStatus } from "react-dom"
import { Product } from "@prisma/client"
import { Colors, Categories, Types } from '@/lib/enums'; // Adjust the import path as necessary
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const colorOptions = Object.values(Colors);
const categoryOptions = Object.values(Categories);
const typeOptions = Object.values(Types);

export function ProductForm({ product }: { product?: Product | null }) {
    const [error, action] = useFormState(
        product == null ? addProduct : updateProduct.bind(null, product.id),
        {}
      )

      const [price, setPrice] = useState<number | undefined>(
        product?.price
      )
      

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={product?.name || ""}
        />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>
      <div className="space-y-2">
      <Label htmlFor="type">Type</Label>
      <Select name="type" required defaultValue={product?.type || ""}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="--" />
        </SelectTrigger>
        <SelectContent>
          {typeOptions.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
        {error.type && <div className="text-destructive">{error.type}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="brand">Brand</Label>
        <Input
          type="text"
          id="brand"
          name="brand"
          required
          defaultValue={product?.brand}
        />
        {error.brand && <div className="text-destructive">{error.brand}</div>}
      </div>
      <div className="space-y-2">
      <Label htmlFor="category">Category</Label>
      <Select name="category" required defaultValue={product?.category || ""}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="--" />
        </SelectTrigger>
        <SelectContent>
          {categoryOptions.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
        {error.category && (
          <div className="text-destructive">{error.category}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="color">Color</Label>
        <Select name="color" required defaultValue={product?.color || ""}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="--" />
        </SelectTrigger>
        <SelectContent>
          {colorOptions.map((color) => (
            <>
              <SelectSeparator />
              <SelectItem key={color} value={color}>
                {color}
              </SelectItem>
            </>
          ))}
        </SelectContent>
      </Select>
        {error.brand && <div className="text-destructive">{error.brand}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="dimensions">Dimensions</Label>
        <Input
          type="text"
          id="dimensions"
          name="dimensions"
          defaultValue={product?.dimensions ? product?.dimensions : ""}
        />
        {error.dimensions && <div className="text-destructive">{error.dimensions}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          id="price"
          name="price"
          required
          value={price}
          onChange={e => setPrice(Number(e.target.value) || undefined)}
        />
        {error.price && (
          <div className="text-destructive">{error.price}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={product?.description}
        />
        {error.description && (
          <div className="text-destructive">{error.description}</div>
        )}
      </div>
      {product? null : 
      <div className="space-y-2">
        <Label htmlFor="images">Images</Label>
        <Input type="file" id="images" name="images" multiple required={product == null} />
        {error.images && <div className="text-destructive">{error.images}</div>}
      </div>}
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  )
}