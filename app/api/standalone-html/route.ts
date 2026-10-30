import { NextResponse } from 'next/server';
import { buildStandaloneHtmlDocument } from '@/lib/standalone-html-builder';

export async function GET() {
  const html = buildStandaloneHtmlDocument();
  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Disposition': 'attachment; filename="hw-security-guard-ltd.html"',
    },
  });
}
