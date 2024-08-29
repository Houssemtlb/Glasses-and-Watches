"use server"

import db from "@/db/db";

export async function getDiapoImages(){
    try {
        const images = await db.diapo.findMany();
        console.log("Fetched images:", images); // Log after fetching
        return images
    } catch (error) {
        console.error("Error fetching images:", error); // Log any errors
        return [];
    }
}