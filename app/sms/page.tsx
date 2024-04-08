"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import SMSLogin from "./action";
import { useFormState } from "react-dom";

export default function SMSLoginPage() {
    const [state, action] = useFormState(SMSLogin, null);

    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">SMS Login</h1>
                <h2 className="text-xl">Verify your phone number</h2>
            </div>
            <form action={action} className="flex flex-col gap-2">
                <Input 
                    name="phone_number"
                    type="number"
                    placeholder="Phone number"
                    required={true}
                    // errors={[""]}
                />
                <Input 
                    name="verify_number"
                    type="number"
                    placeholder="Verification Code"
                    required={true}
                    // errors={[""]}
                />
                <Button 
                    text={"Verify"}    
                />
            </form>
        </div>
    )
}