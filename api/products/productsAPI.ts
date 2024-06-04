"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { SafeParseSuccess } from "zod";
import { ProductType } from "@/app/products/schema";
import { productRevalidate } from "./updateCache";
import { Product } from "@prisma/client";

// GET
export async function getProducts(page:number = 0)
{
    console.log("Hit!!!");
    const products = db.product.findMany({
        select: {
            id: true,
            title: true,
            price: true,
            created_at: true,
            photo: true
        },
        skip: page * 1,
        take:1,
        orderBy: {
            created_at: "desc"
        }
    });
    console.log("end");
    return products;
}

export async function getProduct(id: number) 
{
    const data = db.product.findUnique({
        where: {
            id
        },
        include: {
            user: {
                select: {
                    username: true,
                    avatar: true,
                }
            }
        },
    });

    return data;
}


// UPDATE
export async function updateProduct(
    productID: number, result: ProductType
) {
    console.log("update!");
    const product = await db.product.update({
        where: {
            id: productID, 
        },
        data: {
            photo: "/" + result.photo.name,
            title: result.title,
            description: result.description,
            price: result.price,
        }
    })
    revalidateTag(productRevalidate);
    return product
}

// UPLOAD
export async function createProduct(
    userId: number, result: SafeParseSuccess<ProductType>)
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

    revalidateTag(productRevalidate);
    return product;
}

// DELETE
export async function deleteProduct({
    productID, userId
}: {productID: number, userId: number | undefined}) {
    return async function (prevState: any) {
        "use server";
        if (!userId) {
            return redirect("/home");
        }
        
        try {
            const deleted = await db.product.delete({
                where: {
                    id: productID,
                    userId: userId,
                }
            });
        } catch (e) {
            redirect("/home"); // 임시조치
        }

        revalidateTag(productRevalidate);
        return redirect("/home");
    };
}

// AUTHENTICATION
export async function getIsOwner(id: number) 
{
    const session = await getSession();
    if (session.id) {
        return session.id === id;
    }
    return false;
}

// CREATE CHAT ROOM
export async function createChatRoom(product: Product)
{
    const session = await getSession();
    const room = await db.chatRoom.create({
      data: {
        users: {
          connect: [
            {
              id: product.userId,
            },
            {
              id: session.id,
            },
          ],
        },
      },
      select: {
        id: true,
      },
    });
    redirect(`/chats/${room.id}`);
}