"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function Modal({
    children,
}:{
    children:React.ReactNode
}) {
    const router = useRouter();
    const onCloseClick = () => {
        router.back();
    };
    

    return (
        <div className="absolute w-full h-full left-0 top-0 
        flex items-center justify-center bg-black bg-opacity-70 ">
            <button 
                className="absolute right-10 top-10 text-neutral-500"
                onClick={onCloseClick}
            >
                <XMarkIcon className="size-10"/>
            </button>
            {/* contents */}
            {children}
        </div>
    )
}

/**
 * 
    import { headers } from "next/headers";
    const heads = headers();
    const pathname = heads.get("next-url");
 */