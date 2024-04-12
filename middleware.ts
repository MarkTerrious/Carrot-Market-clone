import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
   
    if (pathname == "/") {
        // response 반환
        const res = NextResponse.next();
        res.cookies.set("middleware-cookie", "hello");
        return res;
    }
    if (pathname == "/profile") {
        return Response.redirect(new URL("/", request.url));
    }

    console.log("hello? d");
}

export const config = {
    matcher: ["/", "/profile", "/create-account"],
}