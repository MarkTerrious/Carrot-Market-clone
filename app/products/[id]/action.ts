"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function getIsOwner(id: number) 
{
    const session = await getSession();
    if (session.id) {
        return session.id === id;
    }
    return false;
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

export async function deleteProduct({
    productID, userId
}: {productID: number, userId: number | undefined}) {
    return async function (prevState: any) {
        "use server";
        if (!userId) {
            return redirect("/products");
        }
        
        try {
            const deleted = await db.product.delete({
                where: {
                    id: productID,
                    userId: userId,
                }
            });
        } catch (e) {
            redirect("/products"); // 임시조치
        }


        return redirect("/products");
    };
}