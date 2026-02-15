import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const BACKEND = 'http://localhost:3001/projects'

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const body = await request.json()

  const res = await fetch(`${BACKEND}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  return NextResponse.json(data)
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  await fetch(`${BACKEND}/${id}`, {
    method: 'DELETE',
  })

  return NextResponse.json({ success: true })
}
