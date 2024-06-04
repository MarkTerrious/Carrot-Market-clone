import { unstable_cache } from "next/cache";
import { getUserInfo } from "./userAPI";
import { revalidate_user_info } from "./revalidation";
import { User } from "@prisma/client";
import { OBJ_SELECT } from "../type";


export async function cachedGetUserInfo(userId: number, select:OBJ_SELECT<User>) 
{
    const userInfo = unstable_cache(getUserInfo, ["GET_USER_INFO"], {
        tags: ["GET_USER_INFO", revalidate_user_info(userId)],
        revalidate: 60
    });

    return userInfo(userId, select);
}