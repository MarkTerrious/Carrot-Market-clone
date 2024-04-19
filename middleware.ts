import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

interface publicURLInterface {
    [key:string]:boolean,
}

const publicURLs: publicURLInterface = {
    "/": true,
    "/login": true,
    "/create-account": true,
    "sms": true,
    "github/start":true,
    "github/complete":true,
}

export async function middleware(request: NextRequest) {
    const session = await getSession();
    const publicURLPath = publicURLs[request.nextUrl.pathname];

    // if we logged in
    if(!session.id) {
        // if we are trying to access another page except public
        if(!publicURLPath) {
            return NextResponse.redirect(new URL(
                "/",
                request.url
            ));
        } 
    } else {
        // even we logged in, we cannot create acc
        if (publicURLPath) {
            return NextResponse.redirect(new URL(
                "/product",
                request.url
            ));
        }
    }
}

export const config = {
    matcher: ["/((?!|_next/static|_next/image|favicon.ico).*)"]
}