"use server";

import { getGitUserData } from "@/api/login/git/gitAPI";
import { checkGitUserExist, createGitData } from "@/api/login/git/gitPrisma";
import { saveSessionData } from "@/api/session";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) 
{
    // Git에서 데이터를 받아온다.
    const [gitUserInfo, gitUserEmail] = await getGitUserData(request);
    if ("error" in gitUserInfo) { return gitUserInfo.error; }
    
    // DB에 User가 등록되어 있는지 확인한다.
    const user = await checkGitUserExist(gitUserInfo);
    let userID: number | null = null;

    if (!user) {
        // Database에 유저가 존재하지 않으면 등록 후 세션 ID를 받는다.
        userID = (await createGitData(gitUserInfo, gitUserEmail[0])).id;
    } else {
        // Database에서 유저가 존재하면 DB의 ID를 세션에 저장.
        userID = user.id;
    }

    // 세션을 HTTP에 저장 및 응답
    await saveSessionData({
        id: userID!,
        rUrl: "/profile"
    });
}





/*
 // Request url에서 code부문 값을 받아온다.
    const code = request.nextUrl.searchParams.get("code");
    if (!code) { 
        return notFound(); 
    }

    // AccessToken을 Git에서 받아온다.
    const accessTokenResponse = await getGitAccessToken(code);
    if ("error" in accessTokenResponse) {
        return new Response(null, {
            status: 400,
            statusText:"error"
        })
    }

    // AccessToken으로 Git에서 User 데이터를 얻어온다.
    const gitUserData = await getGitUserData(accessTokenResponse);
    ---------------------------
    async function getGitAccessToken(code:string) {
     // GIT에 특정 값을 보낼 URL 파라매터 부문 작성
     const accessTokenParams = new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID_PUBLIC!,
        client_secret: process.env.GITHUB_CLIENT_SECRET!,
        code
    }).toString();

    // GIT API 주소에 위 URL파라매터를 붙인다.
    const accessTokenURL = `
        https://github.com/login/oauth/access_token?${accessTokenParams}
    `;

    // fetch로 POST/JSON 형식으로 GIT에 전송!
    const accessTokenResponse = await (await fetch(accessTokenURL,{
        method: "POST",
        headers: {
            Accept: "application/json"
        }
    })).json();

    return accessTokenResponse;
}

async function getGitUserData(userToken:any) {
     // 성공적으로 데이터를 받앗으면...
     const gitUserData = await (await fetch("https://api.github.com/user", {
        headers: {
            Authorization: `${userToken.token_type} ${userToken.access_token}`
        },
        cache: "no-cache",
    })).json();

    return gitUserData;
}

*/