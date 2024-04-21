"use server";

import twilio from "twilio";
import {SafeParseSuccess, number, z} from "zod";
import validator from "validator";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import crypto from "crypto";
import { saveSessionData } from "@/api/session";

interface ActionType {
    token: boolean,
}

const phoneSchema = z.string().trim().refine((phone) =>
    validator.isMobilePhone(phone, "ko-KR"), "Wrong phone format!"
);

const tokenSchema = z.coerce.number()
    .min(100000)
    .max(999999)
    .refine(getUserIdWithToken, {
        message:"This token does not exist ! it may be expired or wrong number. ",
    })

async function getToken() 
{
    const cryptedToken = crypto.randomInt(100000, 999999).toString();
    const user = await db.sMSToken.findUnique({
        where: {
            token: cryptedToken
        },
        select: {
            id: true,
        }
    });

    if (user) {
        return getToken();
    } else {
        return cryptedToken;
    }
}

export async function SMSLogin(prevState:ActionType, formData:FormData) 
{
    const phone = formData.get("phone");
    const token = formData.get("token");

    if (!prevState.token) {
        // 처음 토큰을 가지고 있지 않다면 (condition 1)
        /** Phone 번호 유효성 검사 및 토큰 생성 */
        return await createTokenProcedure(phone);
    } else {
        // 토큰을 가지고 있다면 (condition 2)
        /** 토큰 유효성 검사 후 토큰 가지고 로그인 시도 */
        return await loginWithTokenProcedure(token, phone?.toString());
    }
}

/* ------------- PROCEDURE -> */
async function createTokenProcedure(phone: FormDataEntryValue | null)
{
    const result = phoneSchema.safeParse(phone);
        if(!result.success) {
            // phone 번호가 유효하지 않은 경우
            console.log("None-Token >> ", result.error.flatten());
            return {
                token: false,
                error: result.error.flatten()
            }
        } else {
            // phone 번호가 유효한 경우
            // 이전 토큰 제거
            await deleteTokenWithUser(result);
            // 중복 토큰 체크 및 토큰 생성
            const token = await getToken();
            // 데이터 베이스에 토큰 저장
            await createTokenAndUser(result, token);

            // Twilio를 통해 메시지 전송
            // const client = twilio(
            //     process.env.TWILIO_ACCOUNT_SID,
            //     process.env.TWILIO_ACCOUNT_TOKEN
            // );
            
            // const twilioData = await client.messages.create({
            //     body: `Your verification code is: ${token}`,
            //     from: process.env.TWILIO_PHONE_NUMBER!,
            //     to: process.env.MY_PHONE_NUMBER!,
            // });

            return {
                token: true,            
            }
        }
}

async function loginWithTokenProcedure(
    token: FormDataEntryValue | null,
    phone: string | undefined
) {
    // Verify Number 폼 입력 양식 검사
    const result = await tokenSchema.spa(token);
    if (!result.success) {
        return {
            token: true,
            error: result.error.flatten()
        }
    } else {
        // sms 데이터 베이스의 Token에서 userid를 가져온다
        const tokenID = await checkValidationOfToken({token:result.data, phone});
        if ("error" in tokenID!) return tokenID;
        saveSessionData({ id:tokenID!.userId });
        
        // 토큰을 지우고 Profile 페이지로 이동. 
        await deleteTokenWithToken(result);
        console.log("move into another page!");
        return redirect("/profile");
    }
}

/* ------------- Interface -> */
interface loginDataInterface {
    phone: string | undefined,
    token: number | undefined
}

/* ------------- FEATURE FUNCTION -> */
async function checkValidationOfToken(
    {phone, token}: loginDataInterface) 
{
    if (!(phone && token)){
        return makeTokenError("check either the phone and token exist or not")
    }

    const validToken = await db.sMSToken.findUnique({
        where: {
            token: token.toString(),
            user: {
                phone: phone
            }      
        },
        select: {
            id: true,
            userId: true
        }
    });

    if(!validToken) {
        return makeTokenError("Invalid Token Number");
    }

    return validToken;
    
}

async function getUserIdWithToken(result: number)
{
    const exist = db.sMSToken.findUnique({
        where: {
            token: result.toString(),
        },
        select: {
            id: true,
            userId: true,
        }
    })
    

    return exist;
}

async function createTokenAndUser(result: SafeParseSuccess<string>, token: string) 
{
    await db.sMSToken.create({
        data: {
            token: token,
            user: {
                connectOrCreate: {
                    where: {
                        phone: result.data
                    },
                    create: {
                        username: crypto.randomInt(10).toString(),
                        phone: result.data
                    }
                }

            }
        }
    })
}

async function deleteTokenWithUser(result: SafeParseSuccess<string>) 
{
    const data = await db.sMSToken.deleteMany({
        where: {
            user: {
                phone: result.data
            }
        }
    })

    return data;
}

async function deleteTokenWithToken(result: SafeParseSuccess<number>)
{
    const data = await db.sMSToken.deleteMany({
        where: {
            token: result.data.toString()
        }
    })

    return data;
}

/* ------------- EXCEPTION -> */
function makeTokenError(msg: string) 
{
    return {
        token: true,
        error: {
            formErrors: [msg]
        }
    }
}