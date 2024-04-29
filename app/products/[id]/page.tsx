
import { notFound } from "next/navigation";
import { deleteProduct, getIsOwner, getProduct } from "./action";
import ProductDetailHTML from "./productDetailHTML";
import { getSession } from "@/lib/session";


// products -> products/id
export default async function ProductDetail({
    params,
} : { 
    params: { id: string } 
}) {
    // check whether the id is number or not.
    const id = Number(params.id);
    if (isNaN(id)) return notFound();
    
    // bring user information of the item.
    const product = await getProduct(id);
    if (!product) return notFound();

    const session = await getSession();

    // bring the id of the item to check whether this person is owner
    const isOwner = await getIsOwner(product.userId);
    const testFunc = await deleteProduct({
        productID: product.id,
        userId: session.id
    }); 

    return (
        <ProductDetailHTML 
            isOwner={isOwner} 
            product={product}
            testFunc={testFunc}/>
    )
}