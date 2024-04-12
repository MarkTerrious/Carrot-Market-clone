import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
    id?: number
}

export function getSession() {
    // next js 에서는 cookie가 web요청에 계속 전달된다.
    // 쿠키 설정 안해도 전달 됨.
    // 쿠키 안에 delicious-karrot 을 찾고
    // password에 쿠키 패스워드 저장.
    return getIronSession<SessionContent>(cookies(), {
        cookieName:"delicious-karrot",          
        password:process.env.COOKIE_PASSWORD!,
    });
}