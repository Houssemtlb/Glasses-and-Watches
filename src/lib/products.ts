"use server"

import db from "@/db/db";

export async function getProducts() {
  try {
    console.log("Fetching products..."); // Log before fetching
    const products = await db.product.findMany({
      where: { isAvailableForPurchase: true },
    });
    console.log("Products fetched:", products); // Log after fetching
    return products;
  } catch (error) {
    console.error("Error fetching products:", error); // Log any errors
    return [];
  }
}

export async function getGlasses() {
  try {
    console.log("Fetching glasses..."); // Log before fetching
    const glasses = await db.product.findMany({
      where: { isAvailableForPurchase: true ,type: "Lunettes"},
      },
    );
    console.log("glasses fetched:", glasses); // Log after fetching
    return glasses;
  } catch (error) {
    console.error("Error fetching products:", error); // Log any errors
    return [];
  }
}

export async function getWatches(){
  try {
    console.log("Fetching watches..."); // Log before fetching
    const watches = await db.product.findMany({
      where: { isAvailableForPurchase: true ,type: "Montre"},
      },
    );
    console.log("watches fetched:", watches); // Log after fetching
    return watches;
  } catch (error) {
    console.error("Error fetching products:", error); // Log any errors
    return [];
  }
}

export async function getImages() {
  try {
    console.log("Fetching images..."); // Log before fetching
    const images = await db.image.findMany();
    console.log("Images fetched:", images); // Log after fetching
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
    console.log("Fetching product by ID..."); // Log before fetching
    const product = await db.product.findUnique({
      where: { id },
    });
    console.log("Product fetched:", product); // Log after fetching
    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error); // Log any errors
    return null;
  }
}

export async function getImagesByProductId(productId: string) {
  try {
    console.log("Fetching images by product ID..."); // Log before fetching
    const images = await db.image.findMany({
      where: { productId },
    });
    console.log("Images fetched:", images); // Log after fetching
    return images;
  } catch (error) {
    console.error("Error fetching images by product ID:", error); // Log any errors
    return [];
  }
}

export async function getAvailableGlassesBrands(){
  try {
    console.log("Fetching brands..."); // Log before fetching
    const brands = await db.product.findMany({
      distinct: ['brand'],
      where: { 
        isAvailableForPurchase: true, 
        type : "Lunettes"
       },
    });
    console.log("Brands fetched:", brands); // Log after fetching
    //i only want the brand string value
    return brands.map(brand => brand.brand);
  } catch (error) {
    console.error("Error fetching brands:", error); // Log any errors
    return [];
  }
}

export async function getAvailableWatchesBrands(){
  try {
    console.log("Fetching brands..."); // Log before fetching
    const brands = await db.product.findMany({
      distinct: ['brand'],
      where: { 
        isAvailableForPurchase: true, 
        type : "Montre"
       },
    });
    console.log("Brands fetched:", brands); // Log after fetching
    //i only want the brand string value
    return brands.map(brand => brand.brand);
  } catch (error) {
    console.error("Error fetching brands:", error); // Log any errors
    return [];
  }
}


