import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password === process.env.PYXLY_APP_PASSWORD) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set('pyxly-auth', 'true', {
      path: '/',
      httpOnly: true,
    });
    return res;
  }

  return NextResponse.json({ ok: false }, { status: 401 });
}
