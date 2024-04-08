"use server";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constant";
import {z} from "zod";

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
        .transform((username) => `＊${username}＊`)
        .refine(checkUsername , "potato는 허용되지 않는 값 입니다.!"),
    email: z.string().email().toLowerCase(),
    password: z.string().min(4).regex(
        PASSWORD_REGEX,
        PASSWORD_REGEX_ERROR
    ),
    confirm_password: z.string().min(4),
}).refine(checkPassword, {
    message: "password is not equal",
    path: ["confirm_password"]
});

export default async function createAccount(
    prevState:any, formData:FormData)
{
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),

    }
    const result = formSchema.safeParse(data);
    if (!result.success) {
        console.log( result.error.flatten());
        return result.error.flatten();
    } else {
        console.log("SUCCESS data >> ", result.data);
    }
}