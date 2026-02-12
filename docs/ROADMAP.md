# 장소 기록 관리 웹 개발 로드맵

로그인한 사용자가 맛집/장소를 등록하고, 다른 사용자들과 별점 및 리뷰를 공유하는 소셜 장소 추천 서비스 MVP

## 개요

장소 기록 관리 웹은 방문한 장소를 기록하고 공유하고 싶은 사용자를 위한 서비스로 다음 기능을 제공합니다:

- **장소 등록/관리**: 카카오맵 API를 활용한 키워드 검색으로 주소+좌표 자동 입력, 카테고리별 장소 등록
- **리뷰 시스템**: 장소당 1인 1리뷰, 별점(1-5) + 텍스트, 평균 별점 자동 갱신
- **목록 탐색**: 카드형 리스트 + 검색/카테고리 필터/정렬/페이지네이션
- **지도 표시**: 장소 상세 페이지에서 카카오맵 마커로 위치 확인

## 개발 워크플로우

1. **작업 계획**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
   - 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - `/tasks` 디렉토리에 새 작업 파일 생성
   - 명명 형식: `XXX-description.md` (예: `001-setup.md`)
   - 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
   - API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함

3. **작업 구현**
   - 작업 파일의 명세서를 따름
   - 기능과 기능성 구현
   - API 연동 및 비즈니스 로직 구현 시 Playwright MCP로 테스트 수행 필수
   - 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
   - 각 단계 완료 후 중단하고 추가 지시를 기다림

4. **로드맵 업데이트**
   - 로드맵에서 완료된 작업을 ✅로 표시

## 개발 단계

### Phase 1: 애플리케이션 골격 구축 ✅

- **Task 001: DB 스키마 마이그레이션 및 RLS 설정** ✅ - 완료
  - ✅ places 테이블 생성 (id, user_id, name, description, category, address, latitude, longitude, avg_rating, review_count)
  - ✅ reviews 테이블 생성 (id, place_id, user_id, rating, content, UNIQUE(place_id, user_id))
  - ✅ RLS 정책 설정 (인증 사용자 조회, 본인만 CUD)
  - ✅ 트리거 설정 (updated_at 자동 갱신, avg_rating/review_count 캐시 갱신)
  - ✅ 인덱스 생성 (user_id, category, created_at, avg_rating, name pg_trgm)

- **Task 002: 타입 정의 및 상수 파일 생성** - 우선순위
  - ✅ `database.types.ts` Supabase MCP로 재생성
  - ✅ `lib/types/place.ts` — Place, PlaceWithAuthor, PlaceFormData, PlaceResult, PlaceSearchParams, PlaceListResponse
  - `lib/types/review.ts` — Review, ReviewWithAuthor, ReviewFormData, ReviewResult
  - `lib/constants/place-categories.ts` — 카테고리 ENUM ↔ 한글 라벨/아이콘 매핑

### Phase 2: UI 컴포넌트 구현

- **Task 003: shadcn/ui 추가 및 공통 컴포넌트 구현** - 우선순위
  - shadcn/ui 추가 설치 (Textarea, Select)
  - `components/reviews/star-rating.tsx` — 별점 입력(클릭) + 표시(읽기전용) 겸용 컴포넌트
  - `components/places/place-category-badge.tsx` — Badge + 카테고리 한글 라벨 표시

- **Task 004: 장소 카드 및 목록 UI 구현**
  - `components/places/place-card.tsx` — 카드 UI (이름, 카테고리 배지, 주소, 평균별점, 리뷰수, 작성자)
  - `components/places/place-search-bar.tsx` — 검색어 Input + 카테고리 Select + 정렬 선택 → URL searchParams 변경
  - `components/places/place-list.tsx` — 카드 그리드 레이아웃 + 페이지네이션 UI

- **Task 005: 카카오맵 설정 및 장소 폼 UI 구현**
  - `react-kakao-maps-sdk` 패키지 설치 및 환경변수(`NEXT_PUBLIC_KAKAO_APP_KEY`) 설정
  - `app/layout.tsx`에 카카오맵 SDK Script 태그 추가
  - `components/places/place-map-search.tsx` — 카카오 키워드 검색 → 주소+좌표 선택 Client Component
  - `components/places/place-form.tsx` — 장소 등록/수정 겸용 폼 (이름, 설명, 카테고리 Select, 위치 MapSearch)

- **Task 006: 리뷰 및 장소 상세 UI 구현**
  - `components/reviews/review-form.tsx` — 별점 선택 + 댓글 Textarea (작성/수정 겸용)
  - `components/reviews/review-card.tsx` — 개별 리뷰 카드 (별점, 내용, 작성자, 본인이면 수정/삭제 버튼)
  - `components/reviews/review-list.tsx` — 리뷰 목록 컨테이너
  - `components/places/place-detail.tsx` — 장소 상세 정보 + 카카오맵 마커 표시

### Phase 3: 핵심 기능 구현

- **Task 007: 장소 서버 CRUD 함수 구현** - 우선순위
  - `lib/places.ts` — getPlaces(params), getPlace(id), createPlace(formData), updatePlace(id, formData), deletePlace(id)
  - 페이지네이션: `.range(from, to)` + `{ count: "exact" }`, PAGE_SIZE = 12
  - profiles JOIN으로 작성자 정보 포함
  - Playwright MCP를 활용한 CRUD 통합 테스트

- **Task 008: 리뷰 서버 CRUD 함수 구현**
  - `lib/reviews.ts` — getReviews(placeId), getMyReview(placeId), createReview(placeId, formData), updateReview(reviewId, formData), deleteReview(reviewId)
  - 중복 리뷰 방지 (PostgreSQL 에러코드 23505 처리)
  - profiles JOIN으로 작성자 정보 포함
  - Playwright MCP를 활용한 리뷰 CRUD 테스트

- **Task 009: 장소 Server Actions 및 페이지 연동**
  - `app/protected/places/actions.ts` — createPlaceAction, updatePlaceAction, deletePlaceAction
  - `app/protected/places/page.tsx` — 장소 목록 (searchParams로 getPlaces 호출)
  - `app/protected/places/new/page.tsx` — 장소 등록 페이지
  - `app/protected/places/[id]/page.tsx` — 장소 상세 페이지 (getPlace + getReviews + getMyReview)
  - `app/protected/places/[id]/edit/page.tsx` — 장소 수정 페이지 (본인 확인)
  - Playwright MCP로 장소 등록 → 목록 표시 → 상세 조회 E2E 테스트

- **Task 010: 리뷰 Server Actions 및 페이지 연동**
  - `app/protected/places/[id]/actions.ts` — createReviewAction, updateReviewAction, deleteReviewAction
  - 장소 상세 페이지에 리뷰 폼/목록 통합
  - 리뷰 작성 시 별점 반영 확인, 중복 리뷰 에러 메시지 처리
  - Playwright MCP로 리뷰 작성 → 별점 반영 → 수정/삭제 E2E 테스트

- **Task 010-1: 핵심 기능 통합 테스트**
  - Playwright MCP를 사용한 전체 사용자 플로우 테스트
  - 장소 등록 → 목록 표시 → 상세 조회 → 리뷰 작성 → 별점 반영 플로우
  - 카카오맵 검색 → 주소/좌표 자동 입력 검증
  - 카테고리 필터 / 검색어 / 정렬 동작 검증
  - 본인 장소 수정/삭제 + 중복 리뷰 에러 검증

### Phase 4: 네비게이션 및 최적화

- **Task 011: 네비게이션 연결 및 UX 개선**
  - `app/protected/layout.tsx` 네비게이션에 "장소" 링크 추가
  - 장소 상세 페이지에서 본인(`getClaims().sub === place.user_id`) 확인 후 수정/삭제 버튼 표시
  - 빈 상태 UI (장소 없을 때, 리뷰 없을 때 안내 메시지)
  - 로딩 상태 처리

- **Task 012: 빌드 검증 및 품질 보증**
  - `npx tsc --noEmit` — 타입 체크 통과
  - `npm run lint` — 린트 검사 통과
  - `npm run build` — 프로덕션 빌드 성공
  - Playwright MCP로 최종 전체 플로우 E2E 테스트
