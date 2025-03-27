export async function GET() {
    return Response.json({ status: 'API is working', timestamp: new Date() });
  }