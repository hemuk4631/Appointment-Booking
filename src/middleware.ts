import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decode } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token =
    request.cookies.get('__Secure-authjs.session-token')?.value ||
    request.cookies.get('authjs.session-token')?.value;

  console.log('[Middleware] Raw token:', token);

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const session = await decode({
    token,
    secret: process.env.AUTH_SECRET!,
    salt: 'authjs.session-token',
  });

  console.log('[Middleware] Decoded session:', session);

  if (!session || !session.username) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api/auth|api/.*|_next/static|_next/image|favicon.ico|login|signUp).*)',
  ],
};
