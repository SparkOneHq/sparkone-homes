import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

type LeadEntry = {
  email: string;
  ts: number;
};

const DB = path.join(process.cwd(), 'leads.json');

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
    }

    let arr: LeadEntry[] = [];
    try {
      const raw = await readFile(DB, 'utf8');
      arr = JSON.parse(raw) as LeadEntry[];
    } catch {
      arr = [];
    }

    arr.push({ email, ts: Date.now() });
    await writeFile(DB, JSON.stringify(arr, null, 2), 'utf8');

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
