"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import {useRouter } from "next/navigation";

export default function Modal({
    url,
    children,
}:{
    url: string,
    children:React.ReactNode
}) {
    const router = useRouter();
    const onCloseClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        router.back();
    };

    const onMoveIntoOriginURL = () => {
        location.href = url;
    }
    
    return (
        <div className="absolute w-full h-full left-0 top-0 
        flex items-center justify-center bg-black bg-opacity-70 
        "
        >
            <button 
                className="absolute right-10 top-10 text-neutral-500"
                onClick={onCloseClick}
            >
                <XMarkIcon className="size-10"/>
            </button>
            {/* contents */}
            <div 
                className="hover:cursor-pointer"
                onClick={onMoveIntoOriginURL}>
                {children}
            </div>
        </div>
    )
}