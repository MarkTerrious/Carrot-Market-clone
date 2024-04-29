"use server";

import db from "@/lib/db";

export async function getProducts(page:number = 0)
{
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

    return products;
}