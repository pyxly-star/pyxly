import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Nur /app schützen
  if (pathname.startsWith('/app')) {
    // Login-Seite nicht blockieren
    if (pathname === '/app/login') {
      return NextResponse.next();
    }

    const authCookie = req.cookies.get('pyxly-auth');

    if (!authCookie || authCookie.value !== 'true') {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/app/login';
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/app/:path*'],
};
