import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

export async function middleware(request: NextRequest) {
      console.log("hello? d");
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}