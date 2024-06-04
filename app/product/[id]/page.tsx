import {  getProduct } from "@/api/products/productsAPI";
import { ProductDetail } from "./productServer";


export async function generateMetadata(
    { params }: { params: { id: string } } 
) {
    const product = await getProduct(Number(params.id));
    return {
        title: product?.title,
    }
}

export default async function productBoard(
    { params } :  { params: { id: string } } 
) {
    return ProductDetail({params});
}


// products -> products/id


// export async function generateStaticParams() 
// {
//     const cachedIdPage = await db.product.findMany({
//         select : {
//             id: true,
//         }
//     })

//     return cachedIdPage.map((product) => ({id: product.id + ""}));
// }