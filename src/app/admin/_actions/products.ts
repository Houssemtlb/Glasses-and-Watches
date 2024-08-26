"use server"

import db from "@/db/db"
import { z } from "zod"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { bucket } from "@/lib/firebaseAdmin"; // Import the bucket from Firebase Admin SDK
import { extractFromProductsAndFormat } from "@/lib/formatters"

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
  const name = formData.get('name');
  const price = formData.get('price');
  const description = formData.get('description');
  const type = formData.get('type');
  const color = formData.get('color');
  const dimensions = formData.get('dimensions');
  const brand = formData.get('brand');
  const category = formData.get('category');
  const images = formData.getAll('images');

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
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const imagePaths = [];

  // Upload each image to Firebase Storage using Admin SDK
  for (const image of data.images) {
    try {
      const identifier = `${crypto.randomUUID()}-${image.name}`
      const fileName = `products/${identifier}`;
      const file = bucket.file(fileName);

      // Convert image to Buffer
      const fileBuffer = Buffer.from(await image.arrayBuffer());
      
      // Save file to Firebase Storage
      await file.save(fileBuffer, {
        metadata: {
          contentType: image.type,
        },
      });
      
      const fileNameStorage = `products%2F${identifier}`;

      // Generate download URL
      const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileNameStorage}?alt=media`;
      imagePaths.push({ path: downloadURL });
    } catch (error) {
      console.error(`Failed to upload image ${image.name}:`, error);
      // Handle the error as appropriate for your application
    }
  }

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
  });

  revalidatePath("/");
  revalidatePath("/products");

  redirect("/admin/products");
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

export async function deleteProduct(id: string) {
  const product = await db.product.findUnique({ where: { id } });

  if (!product) {
    return notFound();
  }
  
  const images = await db.image.findMany({ where: { productId: id } });
  
  // Delete images from Firebase Storage using Admin SDK
  await Promise.all(images.map(async (image) => {
    const file = bucket.file(extractFromProductsAndFormat(image.path));
    try {
      await file.delete();
    } catch (error) {
      console.error(`Failed to delete image: ${image.path}`, error);
    }
  }));

  await db.image.deleteMany({ where: { productId: id } });
  await db.product.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/products");

  redirect("/admin/products");
}