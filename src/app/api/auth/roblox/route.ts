import { NextResponse } from 'next/server';
import { robloxLib } from '@/lib/roblox';

export async function GET() {
  const url = robloxLib.getAuthorizationUrl();
  return NextResponse.redirect(url);
}