"use server"

import db from "@/db/db";

export async function getProducts() {
  try {
    const products = await db.product.findMany({
      where: { isAvailableForPurchase: true },
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error); // Log any errors
    return [];
  }
}

export async function getGlasses() {
  try {
    const glasses = await db.product.findMany({
      where: { isAvailableForPurchase: true ,type: "Lunettes"},
      },
    );
    return glasses;
  } catch (error) {
    console.error("Error fetching products:", error); // Log any errors
    return [];
  }
}

export async function getWatches(){
  try {
    const watches = await db.product.findMany({
      where: { isAvailableForPurchase: true ,type: "Montre"},
      },
    );
    return watches;
  } catch (error) {
    console.error("Error fetching products:", error); // Log any errors
    return [];
  }
}

export async function getImages() {
  try {
    const images = await db.image.findMany();
    return images;
  } catch (error) {
    console.error("Error fetching images:", error); // Log any errors
    return [];
  }
}

export async function getGlassesImages() {
  try {
    const products = await getGlasses();
    const glassesImages = await Promise.all(products.map(async product => {
      const images = await db.image.findMany({
        where: { productId: product.id },
      });
      return images;
    }));
    return glassesImages.flat();
    
  } catch (error) {
    console.error("Error fetching data for glasses page:", error);
    return [];
  }
}

export async function getWatchesImages(){
  try {
    const products = await getWatches();
    const watchesImages = await Promise.all(products.map(async product => {
      const images = await db.image.findMany({
        where: { productId: product.id },
      });
      return images;
    }));
    return watchesImages.flat();
    
  } catch (error) {
    console.error("Error fetching data for watches page:", error);
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    const product = await db.product.findUnique({
      where: { id },
    });
    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error); // Log any errors
    return null;
  }
}

export async function getImagesByProductId(productId: string) {
  try {
    const images = await db.image.findMany({
      where: { productId },
    });
    return images;
  } catch (error) {
    console.error("Error fetching images by product ID:", error); // Log any errors
    return [];
  }
}

export async function getAvailableGlassesBrands(){
  try {
    const brands = await db.product.findMany({
      distinct: ['brand'],
      where: { 
        isAvailableForPurchase: true, 
        type : "Lunettes"
       },
    });
    //i only want the brand string value
    return brands.map(brand => brand.brand);
  } catch (error) {
    console.error("Error fetching brands:", error); // Log any errors
    return [];
  }
}

export async function getAvailableWatchesBrands(){
  try {
    const brands = await db.product.findMany({
      distinct: ['brand'],
      where: { 
        isAvailableForPurchase: true, 
        type : "Montre"
       },
    });
    return brands.map(brand => brand.brand);
  } catch (error) {
    console.error("Error fetching brands:", error); // Log any errors
    return [];
  }
}


