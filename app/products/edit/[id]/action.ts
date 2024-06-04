"use server";

import fs from "fs";
import { getSession } from "@/lib/session";
import { updateProduct } from "@/api/products/productsAPI";
import { redirect } from "next/navigation";
import { productSchema } from "../../schema";

// uploadProduct 와 같이 사용할 수 있으나 다시 복기 할려고 타이핑 친 것.
export default async function editProduct(formData: FormData, productID: number) 
{
    const data = {
        photo: formData.get("photo"),
        title: formData.get("title"),
        price: formData.get("price"),
        description: formData.get("description")
    }

    const result = await productSchema.spa(data);
    if (!result.success) { return result.error.flatten(); }
    
    // Save File
    if (result.data.photo instanceof File) {
        const buffer = await result.data.photo.arrayBuffer();
        fs.appendFileSync(`./public/${result.data.photo}`, Buffer.from(buffer));
    }

    // Save the data to DB    
    const session = await getSession();
    if( session.id ) {
        const product = await updateProduct(productID, result.data);
        redirect(`/product/${productID}`);
    }
}

export async function testTest() 
{
    console.log("Test");
}

export async function readPhoto(path: string)
{
    const image = fs.readFileSync(path);
    if(!image) return;

    return Array.from(new Uint8Array(image));
}

/**
 * 
 *  (err, data) => {
        if(err) {
            console.log("readFile error : ", err);
            return;
        }
        if(!data) return;
        
        console.log("readFile Data >> ", [data]);
        const blob = new Blob([data]);
        console.log("read photo >> ", blob);  
        
        url = URL.createObjectURL(blob);        
    }
 */