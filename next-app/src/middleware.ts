import { createI18nMiddleware } from 'next-international/middleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const I18nMiddleware = createI18nMiddleware({
  locales: ['en'],
  defaultLocale: 'en',
  urlMappingStrategy: 'rewrite',
})

export const middleware = async (
  req: NextRequest
): Promise<NextResponse> => {
  const request = I18nMiddleware(req);

  if (req.method === 'GET') {
    const response = request;
    const token = request.cookies.get('session')?.value ?? null;

    if (token !== null) {
      response.cookies.set('session', token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        sameSite: 'lax',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
    }
    return response;
  }

  const originHeader = request.headers.get('Origin');

  const hostHeader = request.headers.get('X-Forwarded-Host');

  if (originHeader === null || hostHeader === null) {
    return new NextResponse(null, {
      status: 403,
    });
  }

  let origin: URL;

  try {
    origin = new URL(originHeader);
  } catch {
    return new NextResponse(null, {
      status: 403,
    });
  }

  if (origin.host !== hostHeader) {
    return new NextResponse(null, {
      status: 403,
    });
  }

  return request;
};

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
};
