import { checkUserExist } from "@/api/sharedDB/checking";
import { PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constant";
import {z} from "zod";

interface PasswordValidation {
    password: string,
    confirm_password: string,
}

function checkUsername(username: string) 
{
    return !username.includes("#");
}

function checkPassword({password, confirm_password}:PasswordValidation) 
{
    return password === confirm_password;
}

export const formSchema = z.object({
    username: z.string({
        invalid_type_error: "string 값으로 넘겨주세요.",
        required_error:"Username은 반드시 입력해야 합니다."
    })
        .min(4, "4글자 이상이어야 합니다")
        .max(10, "10글자 이하이어야 합니다.")
        .trim()
        .toLowerCase()
        // .transform((username) => `＊${username}＊`)
        .refine(checkUsername , "#은 허용되지 않는 값 입니다.!"),
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
.superRefine(validate_username)
.superRefine(validate_email)
.refine(checkPassword, {
    message: "password is not equal",
    path: ["confirm_password"]
})

interface ValidateUser {
    username: string,
    email: string,
}

async function validate_username({username}: ValidateUser, ctx: z.RefinementCtx) 
{
    const user = await checkUserExist({username});

    if (user) {
        ctx.addIssue({
            code: "custom",
            message: "This user name is already exist!",
            path: ["username"],
            fatal: true,    // don't move into next validation step
        })
    }

    return z.NEVER; // don't move into next validation step
}

async function validate_email({email}: ValidateUser, ctx: z.RefinementCtx) 
{
    const user = await checkUserExist({email});

    if (user) {
        ctx.addIssue({
            code: "custom",
            message: "This email is already exist!",
            path: ["email"],
            fatal: true,
        })
    }

    return z.NEVER;
}



