import { NextResponse } from 'next/server'

const BACKEND = 'http://localhost:3001/projects'

export async function PATCH(
  request: Request,
  context: { params: { id: string } }
) {
  const body = await request.json()

  const res = await fetch(`${BACKEND}/${context.params.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  return NextResponse.json(data)
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  await fetch(`${BACKEND}/${context.params.id}`, {
    method: 'DELETE',
  })

  return NextResponse.json({ success: true })
}
