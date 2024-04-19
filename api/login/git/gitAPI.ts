import { NextRequest } from "next/server";

async function fetchGitAccessToken(code:string) 
{
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

export async function getGitUserData(request:NextRequest) 
{ 
    // Git에서 AccessToken을 가져온다.  
    const accessTokenResponse = await getGitAccessToken(request); 
    if ("error" in accessTokenResponse)  return accessTokenResponse;

    // Git에서 AccessToken으로 User 데이터를 얻어온다.
    const [gitUserInfo, gitUserEmail] = await Promise.all([
        getGitUserInfo(accessTokenResponse),
        getGitUserEmail(accessTokenResponse)
    ])

    return {
        gitUserInfo: gitUserInfo, 
        gitUserEmail: gitUserEmail
    };
}

export async function getGitAccessToken(request: NextRequest) 
{
    // URL query 중 code 부문을 들고온다.
    const code = request.nextUrl.searchParams.get("code");
    if (!code) { 
        return makeGitError();
    }

    // Git에서 AccessToken을 가져온다.
    const accessTokenResponse = await fetchGitAccessToken(code);
    if ("error" in accessTokenResponse) {
        return makeGitError();
    }

    return accessTokenResponse;
}

export async function getGitUserInfo(userToken:any) 
{
    const gitUserData = await (await fetch("https://api.github.com/user", {
       headers: {
            Authorization: `${userToken.token_type} ${userToken.access_token}`
       },
       cache: "no-cache",
   })).json();

   return gitUserData;
}

export async function getGitUserEmail(userToken:any) 
{
    const gitUserEmail = await (await fetch("https://api.github.com/user/emails", {
        headers: {
            Authorization: `${userToken.token_type} ${userToken.access_token}`
        },
        cache: "no-cache"
    })).json();

    return gitUserEmail;
}

function makeGitError() 
{
    return {
        error: new Response(null, {
            status: 400,
            statusText:"error"
        })
    }
}