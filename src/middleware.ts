import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: ['/', '/api/:path*', '/dashboard/:path*', '/profile/:path*', '/login', '/signup', '/blog/:path*', '/category/:path*', '/categories/:path*'],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (
    token &&
    (url.pathname.startsWith('/login') ||
      url.pathname.startsWith('/signup') ||
      url.pathname === '/')
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!token && (
    url.pathname.startsWith('/dashboard') ||
    url.pathname.startsWith('/profile') ||
    url.pathname.startsWith('/blog') ||
    url.pathname.startsWith('/category')
  )) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
