// app/api/your-endpoint/route.ts
export async function GET() {
  try {
    const response = await fetch('https://arqui-get-last-parameters-hqs2rtd4la-uc.a.run.app');
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
