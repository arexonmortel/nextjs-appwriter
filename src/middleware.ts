import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail' || path === '/resetpassword';
    const sessionToken = request.cookies.get('token')?.value || '';
    const isPrivatePath = path === '/newpassword';
    if (isPublicPath && sessionToken) {
        return NextResponse.redirect(new URL('/profile',  request.nextUrl));
    }

    if (!isPublicPath && !sessionToken) {
        return NextResponse.redirect(new URL('/login',  request.nextUrl));
    }

    if (isPrivatePath && sessionToken) {
        return NextResponse.redirect(new URL('/profile',  request.nextUrl));
    }
    
}


export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile/:path*',
    '/verifyemail',
    '/resetpassword',
    '/newpassword/:path*',
  ],
}