"use server"

import db from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import path from "path"


  const addOrder = z.object({
    quantity: z.coerce.number().min(0).max(100_000_000),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().min(1),
    phone: z.string().min(1),
    wilaaya: z.string().min(1),
    address: z.string().min(1),
  })

export async function makeOrder(id:string, price: number,qtt:number, prevState: unknown, formData: FormData) {
    // Extract fields from FormData
  const productId = id
  const totalPrice = price
  const quantity = qtt
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const wilaaya = formData.get('wilaaya');
  const address = formData.get('address');
  

  // Parse and validate using zod
  const result = addOrder.safeParse({
    quantity,
    firstName,
    lastName,
    email,
    phone,
    wilaaya,
    address,
  });

  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  //transform to lowercase 
  data.firstName = data.firstName.toLowerCase()
  data.lastName = data.lastName.toLowerCase()

  //look if the user exists
  const user = await db.user.findFirst({
    where: {phone: data.phone, email: data.email, firstName: data.firstName, lastName: data.lastName}
  })

  //put it's id in the variable
  var userId : string | undefined = user?.id;

  //if the user does not exist, create
  if(!user){
    await db.user.create({
        data:{
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            wilaaya: data.wilaaya,
            address: data.address,
        }
    })

    const newUser = await db.user.findFirst({
        where: {phone: data.phone, email: data.email, firstName: data.firstName, lastName: data.lastName}
      })

      userId = newUser?.id;
  }

  await db.order.create({
    data: {
      totalPrice: totalPrice,
      quantity: data.quantity,
      productId: productId,
      userId: userId!,
    },
  })

  revalidatePath("/")
  revalidatePath("/products")

  redirect("/products")
}