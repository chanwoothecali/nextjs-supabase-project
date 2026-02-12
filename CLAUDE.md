# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 개발 명령어

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 시작
npm run lint     # ESLint 린트 검사 (eslint .)
npx tsc --noEmit # TypeScript 타입 체크
```

## 아키텍처

Next.js 15 (App Router) + Supabase (인증/DB) 기반 풀스택 애플리케이션.

### Supabase 클라이언트 패턴

3가지 Supabase 클라이언트가 용도별로 분리되어 있다:

- `lib/supabase/client.ts` — 브라우저(Client Component)용. `createBrowserClient<Database>()` 사용
- `lib/supabase/server.ts` — 서버(Server Component/Server Action)용. `createServerClient<Database>()` + 쿠키 연동. **매 요청마다 새로 생성해야 함** (Fluid compute 대응)
- `lib/supabase/proxy.ts` — 미들웨어용. 모든 요청에서 세션 갱신 + 미인증 사용자 `/auth/login` 리다이렉트

미들웨어 진입점은 루트의 `proxy.ts`이며, 정적 자산을 제외한 모든 경로에 적용된다.

### DB 타입

`lib/supabase/database.types.ts`는 Supabase MCP `generate_typescript_types`로 자동 생성된 타입이다. 스키마 변경 시 재생성해야 한다. 클라이언트/서버 모두 `Database` 제네릭을 통해 타입 안전성을 보장한다.

### 인증 흐름

인증 상태 확인은 `supabase.auth.getClaims()`를 사용한다 (`getUser()`보다 빠름). `auth.users`에는 이메일/비밀번호만 저장되고, 사용자 프로필은 `public.profiles` 테이블에서 관리한다.

### 프로필 가드 패턴

`lib/profile-guard.ts`의 `requireProfile()`은 프로필 미생성 시 `/protected/profile/setup`으로 리다이렉트하는 서버 사이드 가드다. 보호된 페이지에서 호출하여 프로필 설정을 강제한다.

### 라우팅 구조

- `/auth/*` — 공개 인증 페이지 (login, sign-up, forgot-password 등)
- `/protected/*` — 인증 필수 영역. 미들웨어가 미인증 시 로그인으로 리다이렉트
- `/protected/profile/setup` — 최초 프로필 설정 (프로필 있으면 `/protected`로 리다이렉트)
- `/protected/profile` — 프로필 수정 (프로필 없으면 setup으로 리다이렉트)

### UI 패턴

- shadcn/ui (new-york 스타일) + Tailwind CSS + Lucide 아이콘
- 폼 컴포넌트는 Client Component로 구현 (`"use client"` + `useState` + Card UI)
- Server Action을 통해 서버 측 유효성 검사 수행
- CSS 변수 기반 다크/라이트 테마 (`next-themes`)
- 경로 별칭: `@/*` → 프로젝트 루트

### DB 스키마

- `public.profiles` — 사용자 프로필 (auth.users와 1:1, cascade 삭제)
- `public.instruments` — 악기 목록
- RLS 활성화 상태. 정책: 인증 사용자 전체 조회, 본인만 INSERT/UPDATE
