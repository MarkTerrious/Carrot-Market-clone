"use client"

import Button from "@/components/button"
import Input from "@/components/input"
import { useFormState } from "react-dom"
import { startStream } from "./action"

export default function AddStreamHTML()
{
    const [state, action] = useFormState(startStream, null);
    return (
        <form 
            className="
                flex flex-col gap-2 p-5
            "
            action={action}
        >
            <Input 
                name="title"
                placeholder="Title on your stream"
                errors={state?.formErrors}
                required
            />
            <Button text="Start Streaming" />
        </form>
    )
}