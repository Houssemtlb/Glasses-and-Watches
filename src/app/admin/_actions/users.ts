"use server"

import db from "@/db/db";
import { notFound } from "next/navigation";




export async function deleteUser(id : string) {
    // Find the product by ID
    const user = await db.user.findUnique({ where: { id } });
  
    if (!user) {
      return notFound(); // Handle product not found case
    }
    // Delete the product from the database
    await db.user.delete({ where: { id } });
    //redirect("/admin/users");
  }