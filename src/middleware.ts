import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decode } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Check all possible cookie names
  const token =
    request.cookies.get('__Secure-authjs.session-token')?.value ||
    request.cookies.get('authjs.session-token')?.value ||
    request.cookies.get('__Secure-next-auth.session-token')?.value ||
    request.cookies.get('next-auth.session-token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const session = await decode({
      token,
      secret: process.env.NEXTAUTH_SECRET!,
      salt: 'authjs.session-token',
    });

    if (!session || !session.username) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch (error) {
    console.error('JWT Decode Error:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api/auth|api/.*|_next/static|_next/image|favicon.ico|login|signUp).*)',
  ],
};
