// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decode } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Try to get token from all possible cookie names
  const token =
    request.cookies.get('__Secure-authjs.session-token')?.value ||
    request.cookies.get('authjs.session-token')?.value ||
    request.cookies.get('__Secure-next-auth.session-token')?.value ||
    request.cookies.get('next-auth.session-token')?.value;

  const isAuthPage = request.nextUrl.pathname.startsWith('/login');

  // If no token → allow only /login page
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

    // If token is invalid → redirect to /login
    if (!session || !session.username) {
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
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Apply middleware to all pages except public assets & API routes
export const config = {
  matcher: [
    '/((?!api/auth|api/.*|_next/static|_next/image|favicon.ico|signUp).*)',
  ],
};
