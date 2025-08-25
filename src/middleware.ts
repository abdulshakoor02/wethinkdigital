import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const userAgent = request.headers.get('user-agent') || '';
  const isMobile = /Mobile|Android|iPhone|iPad/i.test(userAgent);

  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Mobile-specific optimizations
  if (isMobile) {
    // More aggressive caching for mobile
    response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
    
    // Add mobile performance hints
    response.headers.set('X-Mobile-Optimized', 'true');
    
    // Prioritize critical resources for mobile
    if (request.nextUrl.pathname === '/') {
      response.headers.set('Link', [
        '</fonts/critical.woff2>; rel=preload; as=font; type=font/woff2; crossorigin',
        '</_next/static/css/critical.css>; rel=preload; as=style',
      ].join(', '));
    }
  }

  // Add cache control for static assets
  if (request.nextUrl.pathname.match(/\.(js|css|woff|woff2|eot|ttf|otf|svg|png|jpg|jpeg|gif|ico|webp|avif)$/)) {
    const maxAge = isMobile ? 'max-age=604800' : 'max-age=31536000'; // Shorter cache for mobile
    response.headers.set('Cache-Control', `public, ${maxAge}, immutable`);
  }

  // Add cache control for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store, max-age=0');
  }

  // Add performance hints for desktop
  if (!isMobile && request.nextUrl.pathname === '/') {
    response.headers.set('Link', '</api/contact>; rel=preload; as=fetch; crossorigin');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};