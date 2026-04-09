import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { RankingEntry } from '../../../../types';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'lemon2026';

function parseLine(line: string): string[] {
  const cols: string[] = [];
  let cur = '';
  let inq = false;
  for (const c of line) {
    if (c === '"') { inq = !inq; }
    else if (c === ',' && !inq) { cols.push(cur); cur = ''; }
    else { cur += c; }
  }
  cols.push(cur);
  return cols;
}

function fixName(s: string): string {
  return s.trim().split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

function fixLoc(s: string): string {
  return s.replace(/\s{2,}/g, ' ').trim();
}

type SkippedEntry = { email: string; rawTotal: string; rawCols: string[] };

function parseCSV(text: string): { entries: RankingEntry[]; total: number; skipped: SkippedEntry[]; headers: string[] } {
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  const rows: RankingEntry[] = [];
  const skipped: SkippedEntry[] = [];

  const headers = parseLine(lines[0]).map(h => h.trim());

  // Find referrals column from headers (only this one varies between CSV exports)
  const refIdxFromHeader = headers.findIndex(h =>
    h.toLowerCase().includes('referr') || h.toLowerCase().includes('refer a friend')
  );
  const refIdx = refIdxFromHeader !== -1
    ? refIdxFromHeader
    : (headers[12]?.trim() === '' && (headers[13] ?? '').toLowerCase().includes('full page') ? 14 : 13);

  for (let i = 1; i < lines.length; i++) {
    const c = parseLine(lines[i]);
    if (c.length < 10) continue;

    const email = (c[0] ?? '').trim();
    if (!email) continue;

    const rawTotal = (c[9] ?? '').trim();
    const total = parseInt(rawTotal) || 0;
    const referrals = parseInt(c[refIdx] ?? '0') || 0;

    let first = (c[10] ?? '').trim();
    let last = (c[11] ?? '').trim();
    let location = (c[2] ?? '').trim();

    try { first = fixName(Buffer.from(first, 'latin1').toString('utf8')); } catch { first = fixName(first); }
    try { last = fixName(Buffer.from(last, 'latin1').toString('utf8')); } catch { last = fixName(last); }
    try { location = fixLoc(Buffer.from(location, 'latin1').toString('utf8')); } catch { location = fixLoc(location); }

    if (total === 0) {
      skipped.push({ email, rawTotal, rawCols: c.slice(0, 16) });
    }

    rows.push({ email, first, last, location, total, referrals });
  }

  rows.sort((a, b) => b.total - a.total);
  return { entries: rows.slice(0, 50), total: rows.length, skipped, headers };
}

export async function POST(req: NextRequest) {
  const pwd = req.headers.get('x-admin-password');
  if (pwd !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('csv') as File | null;
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

    // Use the ViralSweep download time provided by admin, fallback to now
    const downloadedAtHeader = req.headers.get('x-downloaded-at');
    const updatedAt = downloadedAtHeader && !isNaN(Date.parse(downloadedAtHeader))
      ? downloadedAtHeader
      : new Date().toISOString();

    const text = await file.text();
    const { entries, total, skipped, headers } = parseCSV(text);

    if (entries.length === 0) {
      return NextResponse.json({ error: 'No valid entries parsed' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'data', 'ranking.json');
    await writeFile(filePath, JSON.stringify(entries, null, 2), 'utf-8');

    // Also persist metadata
    const metaPath = path.join(process.cwd(), 'data', 'meta.json');
    await writeFile(metaPath, JSON.stringify({
      total,
      updatedAt,
      leader: entries[0] ? `${entries[0].first} ${entries[0].last}` : '',
      leaderPts: entries[0]?.total ?? 0,
    }, null, 2), 'utf-8');

    revalidatePath('/');

    return NextResponse.json({ ok: true, total, top: entries[0], skipped, headers });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
