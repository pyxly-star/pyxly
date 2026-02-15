import { NextResponse } from 'next/server';

const BACKEND = 'http://localhost:3001/projects';

export async function PATCH(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const body = await req.json();

  const res = await fetch(`${BACKEND}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data);
}

export async function DELETE(
  _req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  await fetch(`${BACKEND}/${id}`, {
    method: 'DELETE',
  });

  return NextResponse.json({ success: true });
}
