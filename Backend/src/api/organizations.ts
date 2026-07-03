import { NextResponse } from 'next/server';
import { getOrganizationForUser } from '../services/organizations';

export async function GET(request: Request) {
  const userId = request.headers.get('x-user-id') ?? 'unknown';

  if (userId === 'unknown') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const organization = await getOrganizationForUser(userId);
  return NextResponse.json({ organization });
}
