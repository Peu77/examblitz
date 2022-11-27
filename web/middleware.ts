import {NextRequest, NextResponse} from "next/server";
// @ts-ignore
import {me} from "src/requests/userRequests";

export default async function middleware(request: NextRequest) {
    const url = request.url
    const cookie = request.headers.get("cookie")

    if (url.includes("/dashboard")) {
        const userResponse = await me({
            headers: {
                cookie
            }
        })

        if (!userResponse.ok) {
            return NextResponse.redirect(new URL('/account/login', request.url))
        }
    }
}