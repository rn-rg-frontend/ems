import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    const path = req.nextUrl.pathname
    if (!token) {
        return NextResponse.redirect(new URL('/', req.url))
    }else if(path.startsWith('/admin') && !token.isAdmin){
        return NextResponse.redirect(new URL('/', req.url))
    }else if(path.startsWith('/rgemployee') && token.isAdmin){
        return NextResponse.redirect(new URL('/', req.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*', '/rgemployee/:path*'], 
}