import { InputHTMLAttributes } from "react";

interface InputInterProps {
    name:string;
    errors?: string[];
    btnHidden?: string;
}

export default function Input({
    name,
    errors=[],
    btnHidden,
    ...rest 
}:InputInterProps & InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div className="flex flex-col gap-2">
            <input       
                className={`
                    bg-transparent rounded-md w-full h-10 
                    ring-1 ring-neutral-200
                    duration-200
                    focus:outline-none 
                    focus:ring-4 
                    focus:ring-orange-500 border-none
                    placeholder:text-neutral-400
                    p-2
                `}
                name={name}
                {...rest}
            />
            {btnHidden === "hidden" ? null : errors?.map((error, index) => (
                <span key={index} className={`text-red-500 font-medium`}>
                    {error}
                </span>
            ))}
        </div>
    )

}