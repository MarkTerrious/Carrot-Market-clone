"use server";
import { unstable_cache } from "next/cache";
import { getProducts } from "./productsAPI";
import { productRevalidate } from "./updateCache";

export const getCachedProducts = unstable_cache(getProducts, ["home-products"], {
    tags:["home-products", productRevalidate]
});