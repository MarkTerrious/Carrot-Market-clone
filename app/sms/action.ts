"use server";

import {z} from "zod";
import validator from "validator";
import { redirect } from "next/navigation";

interface ActionType {
    token: boolean,
}

const schema = z.object({
    phone_number: z.number(),
    verify_number: z.number()
})

const phoneSchema = z.string().trim().refine((phone) =>
    validator.isMobilePhone(phone, "ko-KR"), "Wrong phone format!"
);
const tokenSchema = z.coerce.number().min(100000).max(999999);

export async function SMSLogin(prevState:ActionType, formData:FormData) {
    const phone = formData.get("phone");
    const token = formData.get("token");
    
    // 처음 토큰을 가지고 있지 않다면...(condition 1)
    if (!prevState.token) {
        // phone 번호 검사.
        const result = phoneSchema.safeParse(phone);
        // 인증 기준에 부합하지 않을 경우 token은 false
        // 인증 기준에 부합한 경우 token은 True
        if(!result.success) {
            console.log("None-Token >> ", result.error.flatten());
            return {
                token: false,
                error: result.error.flatten()
            }
        } else {
            return {
                token: true,
            }
        }
    // -------condition 1 end-------
    } else {
        // if token === true (condition 2)
        const result = tokenSchema.safeParse(token);
        if (!result.success) {
            return {
                token: true,
                error: result.error.flatten()
            }
        } else {
            redirect("/");
        }
    }
}