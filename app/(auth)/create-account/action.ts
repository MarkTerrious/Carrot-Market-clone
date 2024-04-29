"use server";

import bcrypt from "bcrypt";
import db from "@/lib/db";
import { formSchema } from "./account_validation";
import { SafeParseSuccess } from "zod";
import { saveSessionData } from "@/api/session";

export default async function createAccount(prevState:any, formData:FormData)
{
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
    }
    
    const result = await formSchema.safeParseAsync(data);

    if (!result.success) {
        console.log("parse Error >> ", result.error.flatten());
        return result.error.flatten();
    } else {
        const user = await createUserWithPassword(result);
        await saveSessionData({ id: user.id, rUrl: "/profile" });
    }
}

interface AccountFormData {
    username: string,
    email: string,
    password: string,
    confirm_password: string,
}

async function createUserWithPassword(result : SafeParseSuccess<AccountFormData>) 
{
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
        
    const user = await db.user.create({
        data: {
            username: result.data.username,
            email: result.data.email,
            password: hashedPassword,
        },
        select: {
            id: true
        }
    });

    return user;
}