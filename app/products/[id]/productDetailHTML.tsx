"use client";

import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useFormState } from "react-dom";
import { formatToWon } from "@/lib/utils";
import { ProductInterface, UserInterface } from "@/api/sharedDB/types";

interface ProductDetailProps {
    product: {
        user: {
            avatar: string | null,
            username: string
        },
    } & ProductInterface,
    isOwner: boolean,
    testFunc: any,
    modal: boolean
}

export default function ProductDetailHTML(
    { product, isOwner, testFunc, modal=false } : ProductDetailProps,

) {
    const [state, action] = useFormState(testFunc, null);

    return (
        <div>
            {/* Item image */}
            <div className="relative aspect-square">
                <Image fill 
                    src={product.photo} 
                    alt={product.title} 
                    className="object-cover rounded-md overflow-hidden"
                />
            </div>

            {/* User Avatar */}
            <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
                <div className="size-10 rounded-full overflow-hidden"> 
                    {product.user.avatar !== null ? (
                        <Image 
                            src={product.user.avatar!} 
                            alt={product.user.username}
                            width={40}
                            height={40}
                        />
                    ) : (
                        <UserIcon className="" />
                    )}
                </div>
                <div>
                    <h3>{product.user.username}</h3>
                </div>
            </div>

            {/* Product description */}
            <div className="p-5">
                <h1 className="text-2xl font-semibold">{product.title}</h1>
                <p>{product.description}</p>
            </div>

            {/* Bottom : Price, Delete, Chat */}
            {
            !modal ?
            <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center">
                {/* Price */}
                <span className="font-semibold text-xl">
                    {formatToWon(product.price)}원
                </span>

                {/* Delete */}
                {isOwner ? (
                    <form action={action}>
                        <button className="
                          bg-red-500 px-5 py-2.5 rounded-md text-white 
                            font-semibold">
                            Delete
                        </button>
                    </form>
                ) : null }

                {/* Chat */}
                <Link
                    href={``} 
                    className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
                >
                    채팅하기    
                </Link>
            </div>
            : null
            }
        </div>
    )
}