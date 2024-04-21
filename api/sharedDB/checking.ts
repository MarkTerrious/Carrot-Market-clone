import db from "@/lib/db";
import { CheckTokenProperty, UserSearch } from "./types";
import { RequireOnlyone } from "../../lib/types";

/**
 * ex-
 *  RequireAL< UserSearch, id | username > = 
 *      UserSearch, 
 */

export async function checkUserExist({...searchData}: RequireOnlyone<UserSearch>) 
{
    const user = await db.user.findUnique({
        where: {
            ...searchData          
        },
        select: {
            id: true,
        }
    });

    return user;
}
