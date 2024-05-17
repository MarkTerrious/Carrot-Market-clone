"use server";
 
import fs from "fs/promises";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { productSchema } from "../schema";
import { createProduct } from "@/api/products/productsAPI";

export default async function uploadProduct(_: any, formData: FormData)
{
    const data = {
        title: formData.get("title"),
        price: formData.get("price"),
        description: formData.get("description"),
        photo: formData.get("photo"),
    };

    if(!data.photo) {
        console.log("Photo >> ", data.photo);
        return;
    }
    
    // Validate Upload Data
    const result = await productSchema.spa(data);
    if (!result.success) {
        return result.error.flatten()
    } 

    // Save the file into Public
    if (data.photo instanceof File) {
        const photoData = await data.photo.arrayBuffer();
        await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
    }
    
    const session = await getSession();
    if (session.id) {
        const product = await createProduct(session.id, result);
        redirect(`/product/${product.id}`);
    }
    
}



/*
 async function saveFile(file: File)
{
    const buffer = Buffer.from(await file.arrayBuffer());
    try {
        await writeFile(
            path.join(process.cwd(), "/public/" + file.name), 
            buffer
        )
        return true;
    } catch ( err ) {
        console.log("err >> ", err);
        return false;
    }
}
 */