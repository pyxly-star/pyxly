import { NextResponse } from 'next/server';

let projects = [
  { id: 1, name: 'Mein erstes Projekt' },
  { id: 2, name: 'Fullstack Projekt' },
];

// 🔹 CORS Header (WICHTIG für Mobile & Google)
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// 🔹 GET /api/projects
export async function GET() {
  return NextResponse.json(projects, {
    headers: corsHeaders,
  });
}

// 🔹 POST /api/projects
export async function POST(req: Request) {
  const body = await req.json();

  const newProject = {
    id: Date.now(),
    name: body.name,
  };

  projects.push(newProject);

  return NextResponse.json(newProject, {
    status: 201,
    headers: corsHeaders,
  });
}

// 🔹 OPTIONS → ABSOLUT NOTWENDIG für Mobile
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}
