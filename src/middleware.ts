import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decode } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("--- Middleware Start ---");
  console.log("Pathname:", pathname);

  const token =
    request.cookies.get('__Secure-authjs.session-token')?.value ||
    request.cookies.get('authjs.session-token')?.value ||
    request.cookies.get('__Secure-next-auth.session-token')?.value ||
    request.cookies.get('next-auth.session-token')?.value;

  console.log("Token Cookie Found:", !!token);

  const isAuthPage = pathname === '/login';

  if (!token) {
    if (!isAuthPage) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  try {
    const session = await decode({
      token,
      secret: process.env.NEXTAUTH_SECRET!,
      salt: token.startsWith('__Secure-')
        ? '__Secure-authjs.session-token'
        : 'authjs.session-token',
    });

    if (!session) {
      if (!isAuthPage) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
      return NextResponse.next();
    }

    if (isAuthPage) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('JWT Decode Error:', error);
    if (!isAuthPage) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico|signUp|login).*)',
  ],
};
