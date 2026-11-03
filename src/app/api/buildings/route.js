import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { verifyToken, COOKIE_NAME } from '../../../lib/auth';

export async function GET(request) {
  // 1. Reject unauthenticated requests (mirrors the /api/auth/me pattern)
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await verifyToken(token);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 2. Fetch all buildings ordered alphabetically
    const result = await query(
      `SELECT id, name, latitude, longitude, ramp_status, lift_status, stairs_status
       FROM buildings
       ORDER BY name ASC`
    );

    // 3. Reshape rows: convert snake_case DB columns to camelCase
    const buildings = result.rows.map((row) => ({
      id:           row.id,
      name:         row.name,
      latitude:     row.latitude,
      longitude:    row.longitude,
      rampStatus:   row.ramp_status,
      liftStatus:   row.lift_status,
      stairsStatus: row.stairs_status,
    }));

    // 4. Return the clean JSON response
    return NextResponse.json({ buildings });
  } catch (err) {
    // 5. Log on the server and return a safe error message to the client
    console.error('[GET /api/buildings]', err);
    return NextResponse.json(
      { error: 'Unable to load building accessibility data' },
      { status: 500 }
    );
  }
}

