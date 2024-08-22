"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/lib/formatters"
//import { addProduct, updateProduct } from "../../_actions/products"
import { useFormState, useFormStatus } from "react-dom"
import { Product } from "@prisma/client"
import Image from "next/image"
import { makeOrder } from "@/app/(customerFacing)/_actions/orders"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

export function PurchaseForm({id,price}: {id : string,price:number}) {

  const [totalPrice,setTotalPrice] = useState(0)
  const [quanity,setQuantity] = useState(0)

  const [error, action] = useFormState(
      makeOrder.bind(null,id,totalPrice,quanity),{}
    )

  return (
    <form action={action} className="space-y-2">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          type="text"
          id="firstName"
          name="firstName"
          required
        />
        {error.firstName && <div className="text-destructive">{error.firstName}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          type="text"
          id="lastName"
          name="lastName"
          required
        />
        {error.lastName && <div className="text-destructive">{error.lastName}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          required
        />
        {error.email && <div className="text-destructive">{error.email}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          type="tel"
          id="phone"
          name="phone"
          required
        />
        {error.phone && <div className="text-destructive">{error.phone}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="wilaaya">Wilaaya</Label>
        <Input
          type="text"
          id="wilaaya"
          name="wilaaya"
          required
        />
        {error.wilaaya && <div className="text-destructive">{error.wilaaya}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          name="address"
          required
        />
        {error.address && <div className="text-destructive">{error.address}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          type="number"
          id="quantity"
          name="quantity"
          onChange={(e) => {setQuantity(parseInt(e.target.value))
            setTotalPrice(parseInt(e.target.value) * price)
          }}
          required
        />
        {error.quantity && <div className="text-destructive">{error.quantity}</div>}
      </div>
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  const { toast } = useToast()

  return (
    <Button type="submit" disabled={pending} onClick={()=>{
      toast({
        title: "Thank you for your purchase!",
        description: "Our team members will contact you shortly to confirm your order.",
      })
    }}>
      {pending ? "Saving..." : "Save"}
    </Button>
  )
}