import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const pathname = request.nextUrl.pathname;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ------------------------
  // LOGIN PAGE
  // ------------------------
  if (pathname === "/asgard/login") {
    if (user) {
      const { data: admin } = await supabase
        .from("admins")
        .select("id")
        .eq("id", user.id)
        .single();

      if (admin) {
        return NextResponse.redirect(
          new URL("/asgard/dashboard", request.url)
        );
      }
    }

    return response;
  }

  // ------------------------
  // PROTECTED ASGARD ROUTES
  // ------------------------

  if(pathname === "/asgard"){
    if(!user){
      return NextResponse.redirect(new URL("/asgard/login", request.url));
    }else {
      return NextResponse.redirect(new URL("/asgard/dashboard", request.url));
    }
  }

  if (pathname.startsWith("/asgard")) {
    if (!user) {
      return NextResponse.redirect(
        new URL("/asgard/login", request.url)
      );
    }

    const { data: admin } = await supabase
      .from("admins")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!admin) {
      return NextResponse.redirect(
        new URL("/asgard/login", request.url)
      );
    }
  }

  return response;
}