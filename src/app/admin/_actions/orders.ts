"use server"

import db from "@/db/db";
import { notFound } from "next/navigation";

export async function toggleValidateOrder(id:string){
  //toggle the isValidated field of that order
  const order = await db.order.findUnique({ where: { id } });
  if (!order) {
    return notFound(); 
  }
  //update the isValidated field of the order
  await db.order.update({
    where: { id },
    data: {
      isValidated: !order.isValidated,
    },
  });
  
}

export async function deleteOrder(id : string) {
    // Find the product by ID
    const order = await db.order.findUnique({ where: { id } });
  
    if (!order) {
      return notFound(); // Handle product not found case
    }
    // Delete the product from the database
    await db.order.delete({ where: { id } });
    //redirect("/admin/users");
  }


  export async function getSpecificOrderInfos(id: string) {
    const order = await db.order.findUnique({ where: { id } });
    if (!order) return null;
  
    const product = await db.product.findUnique({ where: { id: order.productId } });
    const user = await db.user.findUnique({ where: { id: order.userId } });
  
    if (order && product && user) {
      return { order, product, user };
    }
    
    return null;
  }