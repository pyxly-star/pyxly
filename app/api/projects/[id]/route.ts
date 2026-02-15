import { NextResponse } from 'next/server';

const BACKEND = 'http://localhost:3001/projects';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const res = await fetch(`${BACKEND}/${params.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await fetch(`${BACKEND}/${params.id}`, {
    method: 'DELETE',
  });

  return NextResponse.json({ success: true });
}
