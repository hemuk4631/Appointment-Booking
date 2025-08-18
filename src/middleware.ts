import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decode } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token =
    request.cookies.get('__Secure-authjs.session-token')?.value ||
    request.cookies.get('authjs.session-token')?.value ||
    request.cookies.get('__Secure-next-auth.session-token')?.value ||
    request.cookies.get('next-auth.session-token')?.value;

  const pathname = request.nextUrl.pathname;
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
      salt: 'authjs.session-token',
    });


    if (!session || !session.username) {
      console.log('not session')
      if (!isAuthPage) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
      return NextResponse.next();
    }

    if (isAuthPage) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } catch (error) {
    console.error('JWT Decode Error:', error);
    if (!isAuthPage) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api/auth|api/.*|_next/static|_next/image|signUp|login).*)',
  ],
};
