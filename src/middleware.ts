import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decode } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  try {
    const token =
      request.cookies.get('__Secure-authjs.session-token')?.value ||
      request.cookies.get('authjs.session-token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) {
      console.error('❌ NEXTAUTH_SECRET is missing in environment variables');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const session = await decode({
      token,
      secret,
      salt: 'authjs.session-token',
    });

    if (!session || !session.username) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('❌ Middleware error:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/((?!api/auth|api/.*|_next/static|_next/image|favicon.ico|login|signUp).*)',
  ],
};
