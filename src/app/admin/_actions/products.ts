"use server"

import db from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import path from "path"


const imageSchema = z.instanceof(File).refine(
  file => file.size === 0 || file.type.startsWith("image/"),
  { message: "required" }
)

const addSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().min(0).max(100_000_000),
  description: z.string().min(1),
  color: z.string().min(1),
  dimensions: z.string().min(0).optional(),
  type: z.string().min(1),
  brand: z.string().min(1),
  category: z.string().min(1),
  images: z.array(imageSchema).min(1),
})

const updateSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().min(0).max(100_000_000),
  description: z.string().min(1),
  type: z.string().min(1),
  brand: z.string().min(1),
  color: z.string().min(1),
  dimensions: z.string().min(0).optional(),
  category: z.string().min(1),
  images: z.array(imageSchema).optional(),
})

export async function addProduct(prevState: unknown, formData: FormData) {
  // Extract fields from FormData
  const name = formData.get('name');
  const price = formData.get('price');
  const description = formData.get('description');
  const type = formData.get('type');
  const color = formData.get('color');
  const dimensions = formData.get('dimensions');
  const brand = formData.get('brand');
  const category = formData.get('category');
  const images = formData.getAll('images');

  // Parse and validate using zod
  const result = addSchema.safeParse({
    name,
    price,
    description,
    type,
    color,
    dimensions,
    brand,
    category,
    images,
  });

  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  //create imagePaths type 
  type ImagePathsType = { path: string }[]

  const imagePaths: ImagePathsType = []

  await fs.mkdir("public/products", { recursive: true });

  data.images.map(async (image, index) => {

    const imagePath = `/products/${crypto.randomUUID()}-${image.name}`
    //append the paths to an array imagePaths
    imagePaths.push({path: `${imagePath}`})
    
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await image.arrayBuffer())
    );
  });

  await db.product.create({
    data: {
      isAvailableForPurchase: false,
      name: data.name,
      description: data.description,
      price: data.price,
      type: data.type,
      brand: data.brand,
      category: data.category,
      color: data.color,
      dimensions: data.dimensions,
      images: { create: imagePaths },
    },
  })

  revalidatePath("/")
  revalidatePath("/products")

  redirect("/admin/products")
}


export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = updateSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data
  const product = await db.product.findUnique({ where: { id } })

  if (product == null) return notFound()

  await db.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      type: data.type,
      brand: data.brand,
      color: data.color,
      dimensions: data.dimensions,
      category: data.category,
    },
  })

  revalidatePath("/")
  revalidatePath("/products")

  redirect("/admin/products")
}

export async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  await db.product.update({ where: { id }, data: { isAvailableForPurchase } })

  revalidatePath("/")
  revalidatePath("/products")
}

export async function deleteProduct(id : string) {
  // Find the product by ID
  const product = await db.product.findUnique({ where: { id } });

  if (!product) {
    return notFound(); // Handle product not found case
  }

  // Find all images related to the product
  const images = await db.image.findMany({ where: { productId: id } });
  images.map((image) => console.log(`here are the path : ${image.path}`));

  // Delete images from file system
  await Promise.all(images.map(async (image) => {
    try {
      const filePath = path.join('public', image.path);
      console.log(`Deleting file: ${filePath}`);
      
      const stat = await fs.stat(filePath);
      if (stat.isFile()) {
        await fs.unlink(filePath);
        console.log(`File deleted: ${filePath}`);
      } else {
        console.error(`Path is not a file: ${filePath}`);
      }
    } catch (error) {
      console.error(`Failed to delete file: ${image.path}`, error);
    }
  }));

  // Delete related images from the database
  await db.image.deleteMany({ where: { productId: id } });

  // Delete the product from the database
  await db.product.delete({ where: { id } });

  // Revalidate paths to clear any cached data
  revalidatePath("/");
  revalidatePath("/products");

  // Redirect to the products admin page
  redirect("/admin/products");
}