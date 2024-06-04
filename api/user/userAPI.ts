import db from "@/lib/db";
import { User } from "@prisma/client";
import { OBJ_SELECT } from "../type";

export async function getUserInfo(userId: number, select:OBJ_SELECT<User>={})
{
    try {
        const user = db.user.findUnique({
            where: {
                id: userId
            },
            select: {
                ...select
            }
        })
        
        return user;
    } catch (e) { }
}
