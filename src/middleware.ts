import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail' || path === '/resetpassword';
    const sessionToken = request.cookies.get('token')?.value || '';
    const newpasswordToken = request.nextUrl.searchParams.get('token');
    const isPrivatePath = path === '/newpassword';

    // Redirect authenticated users away from public paths
    if (isPublicPath && sessionToken) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl));
    }

    // Redirect unauthenticated users away from private paths, except for '/newpassword' with a token
    if (!isPublicPath && !sessionToken && !isPrivatePath) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    // Handle '/newpassword' access logic
    if (isPrivatePath) {
        if (sessionToken) {
            return NextResponse.redirect(new URL('/profile', request.nextUrl));
        }
        if (!newpasswordToken) {
            return NextResponse.redirect(new URL('/login', request.nextUrl));
        }
    }
    
    // Allow access if all checks pass
    return NextResponse.next();
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
};
