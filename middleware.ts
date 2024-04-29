import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

interface publicURLInterface {
    [key:string]:boolean,
}

const authURLs: publicURLInterface = {
    "/": true,
    "/login": true,
    "/sms": true,
    "/create-account": true,
    "/github/start":true,
    "/github/complete":true,
}

export async function middleware(request: NextRequest) {
    const session = await getSession();
    const authURLPath = authURLs[request.nextUrl.pathname];

    // console.log(`PATH >> ${request.nextUrl.pathname} ${authURLPath}`);
    
    if(!session.id) {
        // if we are trying to access another page without valid seesion
        if(!authURLPath) {
            return NextResponse.redirect(new URL(
                "/", request.url
            ));
        } 
    } else {
        // if we are logged in, we cannot create acc
        if (authURLPath) {
            return NextResponse.redirect(new URL(
                "/products", request.url
            ));
        }
    }
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ]
}