import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { RankingApiResponse, RankingEntry } from '../../../types';

// Stub for future ViralSweep API integration
// Currently reads from local data/ranking.json
// Replace this with ViralSweep API fetch when credentials are available

export async function GET(): Promise<NextResponse<RankingApiResponse>> {
  const filePath = path.join(process.cwd(), 'data', 'ranking.json');
  const raw = await readFile(filePath, 'utf-8');
  const entries: RankingEntry[] = JSON.parse(raw);

  const response: RankingApiResponse = {
    entries,
    total: 10546,
    updatedAt: new Date().toISOString(),
  };

  return NextResponse.json(response);
}
