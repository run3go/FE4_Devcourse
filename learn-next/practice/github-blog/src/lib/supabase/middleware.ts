import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasEnvVars } from "../utils";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // 환경 변수가 설정되어 있지 않으면 미들웨어 체크를 건너뜁니다. 프로젝트 설정이 완료되면 이 코드는 제거할 수 있습니다.
  if (!hasEnvVars) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // createServerClient와 supabase.auth.getUser() 사이에는 코드를 작성하지 마세요.
  // 간단한 실수로 인해 사용자가 무작위로 로그아웃되는 문제를 디버깅하기 매우 어려워질 수 있습니다.

  // 중요: auth.getUser()는 반드시 제거하지 마세요.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("updateSession", user);

  // 로그인이 안되어 있으면
  // login 시작하거나 auth 시작하는 경로만 접근 가능함.
  // /profile -> /auth/login
  if (
    request.nextUrl.pathname !== "/" &&
    !user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/auth") &&
    !request.nextUrl.pathname.startsWith("/post")
  ) {
    // 사용자가 없을 경우, 로그인 페이지로 리다이렉트할 수 있습니다.
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // 중요: 반드시 supabaseResponse 객체를 그대로 반환해야 합니다.
  // NextResponse.next()로 새로운 응답 객체를 생성하는 경우, 반드시 다음을 따라야 합니다:
  // 1. 요청(request)을 함께 전달하세요:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. 쿠키를 복사하세요:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. myNewResponse 객체를 필요에 맞게 수정하되, 쿠키는 변경하지 마세요!
  // 4. 마지막으로:
  //    return myNewResponse
  // 위 과정을 지키지 않으면 브라우저와 서버의 세션이 동기화되지 않아 사용자의 세션이 조기에 종료될 수 있습니다!

  return supabaseResponse;
}
