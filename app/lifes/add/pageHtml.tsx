"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useRef } from "react";
import { uploadPost } from "./action";


export default function LifePostHtml()
{
    const descriptionRef = useRef<HTMLDivElement>(null)
    const testSubmit = async (formData: FormData) => {
        formData.append("description", descriptionRef.current?.textContent || "")
        const result = await uploadPost(formData);
        console.log(" >> ", result);
    }

    return(
        <div 
            className="
                    border border-white 
                    flex flex-col items-center justify-center
                "
            >
            <form 
                className="
                    flex flex-col gap-3
                    mt-10 w-full *:mx-3
                "
                action={testSubmit}
            >
                <div 
                    className="
                        flex flex-row 
                        items-center justify-around gap-2
                    "
                >
                    <span className="flex-1 text-center "> Title </span>
                    <Input name="title"/>
                </div>
                <div>
                    <div 
                        ref={descriptionRef}
                        contentEditable={true}
                        className="
                            h-auto min-h-80
                            bg-white rounded-md
                            text-black outline-none 
                            transition duration-300
                            focus:ring-4 focus:ring-orange-500
                            pb-5
                        "
                    >
                    </div>
                </div>
                <div className="flex flex-row justify-end flex-wrap">
                    <div className="w-36">
                        <Button 
                            text="Send"
                        />
                    </div>
                        
                </div>
            </form>
            <div className="p-3"/>
        </div>
    )
}