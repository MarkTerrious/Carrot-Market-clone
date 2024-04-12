"use server";

import bcrypt from "bcrypt";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constant";
import db from "@/lib/db";
import {z} from "zod";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

function checkUsername(username: string) {
    return !username.includes("potato");
}

interface PasswordValidation {
    password: string,
    confirm_password: string,
}

function checkPassword({password, confirm_password}:PasswordValidation) {
    return password === confirm_password;
}

const formSchema = z.object({
    username: z.string({
        invalid_type_error: "string 값으로 넘겨주세요.",
        required_error:"Username은 반드시 입력해야 합니다."
    })
        .min(4, "4글자 이상이어야 합니다")
        .max(10, "10글자 이하이어야 합니다.")
        .trim()
        .toLowerCase()
        // .transform((username) => `＊${username}＊`)
        .refine(checkUsername , "potato는 허용되지 않는 값 입니다.!"),
    email: 
        z.string()
        .email()
        .toLowerCase(),
        password: z.string().min(4).regex(
        PASSWORD_REGEX,
        PASSWORD_REGEX_ERROR
    ),
    confirm_password: z.string().min(4),
})
.superRefine(async ({username}, ctx) => {
    const user = await db.user.findUnique({
        where:{
            username: username,
        },
        select: {
            id: true,
        }
    });

    if(user) {
        ctx.addIssue({
            code: "custom",
            message: "This user name is already exist!",
            path: ["username"],
            fatal: true,
        })
    }

    return z.NEVER;
})
.superRefine(async ({email}, ctx) => {
    const user = await db.user.findUnique({
        where:{
            email: email
        },
        select: {
            id: true,
        }
    });

    if(user) {
        ctx.addIssue({
            code: "custom",
            message: "This email is already exist!",
            path: ["email"],
            fatal: true,
        })
    }

    return z.NEVER;
})
.refine(checkPassword, {
    message: "password is not equal",
    path: ["confirm_password"]
})

export default async function createAccount(
    prevState:any, formData:FormData)
{
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
    }

    const result = await formSchema.safeParseAsync(data);
    
    if (!result.success) {
        console.log( result.error.flatten());
        return result.error.flatten();
    } else {
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

        const session = await getSession();
        session.id = user.id;
        await session.save();
        // console.log("SUCCESS >> ", user);

        redirect("/profile");
    }
}