"use server";
 
import db from "@/lib/db";
import fs from "fs/promises";
import { getSession } from "@/lib/session";
import { writeFile } from "fs/promises";
import { redirect } from "next/navigation";
import path from "path";
import { SafeParseSuccess, z } from "zod";
import { UploadType, uploadSchema } from "./schema";

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
    const result = await uploadSchema.spa(data);
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
        redirect(`/products/${product.id}`);
    }
    
}


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

async function createProduct(
    userId: number, result: SafeParseSuccess<UploadType>)
{
    const product = await db.product.create({
        data: {
            userId: userId,
            title: result.data.title,
            price: result.data.price,
            description: result.data.description,
            photo: "/" + result.data.photo!.name,
        },
        select: {
            id: true
        }
    });

    return product;
}



 /*
    try {
        await writeFile(
            path.join(process.cwd(), "/public/" + file.name), 
            buffer
        )
    } catch ( err ) {
        console.log("err >> ", err);
    }
    */