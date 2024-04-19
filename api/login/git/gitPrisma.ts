import db from "@/lib/db";

export async function createGitData(
    {id, login, avatar_url}:gitUserData,
    {email}:{email:string}
) {
    const newUserData = await db.user.create({
        data: {
            username: login + `#Git-${id}`,
            github_id: id.toString(),
            avatar: avatar_url,
            email
        },
        select: {
            id: true,
        }
    });

    return newUserData;
}

export async function checkGitUserExist({id}:gitUserData) 
{
    const user = await db.user.findUnique({
        where: {
            github_id: id.toString(),
        },
        select: {
            id: true,
        }
    });

    return user;
}