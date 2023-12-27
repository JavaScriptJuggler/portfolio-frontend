import { NextResponse } from 'next/server'

export function middleware(request) {
  const protectedRoutes = [
    '/admin/dashboard',
    '/admin/content-management-system',
    '/admin/about',
    '/admin/blog/add-blog',
    '/admin/blog/list-blog',
    /^\/admin\/blog\/.*$/,
    '/admin/portfolio',
    '/admin/portfolio/add-portfolio',
    /^\/admin\/portfolio\/.*$/,
    '/admin/profile',
  ];
  const token = request.cookies.get('token');
  /* route protection */
  if (protectedRoutes.some(route =>
    typeof route === 'string'
      ? request.nextUrl.pathname === route
      : route.test(request.nextUrl.pathname)
  ) &&
    !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  /* if loggeding login page not to open */
  if (request.nextUrl.pathname == '/admin/login' && token) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico).*)'],
}