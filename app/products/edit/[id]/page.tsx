import { notFound, redirect } from "next/navigation";
import EditHtml from "./pageHTML";
import { PromiseReturnType } from "@prisma/client/extension";
import { getIsOwner, getProduct } from "@/api/products/productsAPI";
import { readPhoto } from "./action";

export default async function Edit({
    params
}: {
    params : {id: string}
}) {
    // check whether the id is number or not.
    const id = Number(params.id);
    if (isNaN(id)) return notFound();
    
    const isOwner = getIsOwner(id);
    if (!isOwner) redirect("/home");
    
    // bring user information of the item.
    const product = await getProduct(id);
    if (!product) return notFound();

    // Test Zone
    const image = await readPhoto("./public/" + product.photo);    

    // Test End
    return (
        <EditHtml product={product} imgBinary={image}/>
    )
}

type test = PromiseReturnType<typeof getProduct>
