import { Prisma } from "@prisma/client";
import ProductsList from "./productList";
import { getProducts } from "./action";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";

export type InitialProducts = Prisma.PromiseReturnType<typeof getProducts>;

export default async function Products() 
{
    // Load All Products data from db
    const products = await getProducts();
    
    return (
        <div>
            <ProductsList initialProducts={products} />
            <Link 
                href={"/products/add"}
                className="bg-orange-500 flex items-center justify-center rounded-full size-16 
                fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
            >
                <PlusIcon className="size-10"/>
            </Link>
        </div>
    );
}