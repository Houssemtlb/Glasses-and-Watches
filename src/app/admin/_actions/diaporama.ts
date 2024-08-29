"use server"

import db from "@/db/db"
import { z } from "zod"
import { redirect } from "next/navigation"
import { bucket } from "@/lib/firebaseAdmin"; 



const imageSchema = z.instanceof(File).refine(
    file =>  file.type.startsWith("image/"),
    { message: "required" }
  )

const diapoSchema = z.object({
    images : z.array(imageSchema).min(1)
});


export async function editDiapo(prevState: unknown, formData: FormData){
    const images = formData.getAll('images');
    console.log(images);

    const result = diapoSchema.safeParse({
        images,
    });

    if (result.success === false) {
    return result.error.formErrors.fieldErrors;
    }

    const data = result.data;
    const imagePaths = [];

    //delete all the images in the diapos filder in google storage
    try{
        const [files] = await bucket.getFiles({ prefix: "diapos/" });
        await Promise.all(files.map(file => file.delete()));
        console.log("Deleted all images in diapos folder");
    }catch(error){
        console.error("Failed to delete images:", error);
    }
    

    //delete all the rows in diapo table
    await db.diapo.deleteMany();

    // Upload each image to Firebase Storage using Admin SDK
    for (const image of data.images) {
        try {
            const identifier = `${crypto.randomUUID()}-${image.name}`
            const fileName = `diapos/${identifier}`;
            const file = bucket.file(fileName);

            // Convert image to Buffer
            const fileBuffer = Buffer.from(await image.arrayBuffer());
            
            // Save file to Firebase Storage
            await file.save(fileBuffer, {
            metadata: {
                contentType: image.type,
            },
            });
            
            const fileNameStorage = `diapos%2F${identifier}`;

            // Generate download URL
            const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileNameStorage}?alt=media`;
            imagePaths.push({ path: downloadURL});
        } catch (error) {
            console.error(`Failed to upload image ${image.name}:`, error);
        }
    }

    imagePaths.forEach(async element => {
        await db.diapo.create({
            data :{
                path: element.path
            }
        
        });
    });

    redirect("/admin/diaporama");
}