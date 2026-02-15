import { NextResponse } from 'next/server';

const BACKEND = 'http://localhost:3001/projects';

export async function GET() {
  const res = await fetch(BACKEND);
  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(BACKEND, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
