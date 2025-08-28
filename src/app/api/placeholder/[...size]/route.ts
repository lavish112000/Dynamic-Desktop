import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET(request: NextRequest, { params }: { params: { size: string[] } }) {
  const size = params.size[0] || '300/200';
  const [width, height] = size.split('/').map(Number);
  const w = Math.min(width || 300, 1920);
  const h = Math.min(height || 200, 1080);
  
  // Create a simple SVG placeholder
  const svg = `
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16">${w}×${h}</text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
