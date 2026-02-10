# PRD: Notion CMS 활용 개인 개발 블로그

## 1. 프로젝트 개요

### 1.1 프로젝트명

**Notion Blog** - Notion을 CMS로 활용한 개인 개발 블로그

### 1.2 프로젝트 목적

- Notion을 CMS로 활용하여 콘텐츠 관리의 편의성 확보
- 개인 개발 블로그를 통한 기술 지식 공유 및 포트폴리오 구축
- Next.js 기반의 빠르고 SEO 친화적인 블로그 구현

### 1.3 CMS로 Notion을 선택한 이유

- **익숙한 편집 환경**: Notion의 블록 기반 에디터로 편리한 글 작성
- **무료 사용**: 개인 사용 시 비용 부담 없음
- **실시간 동기화**: Notion에서 작성한 내용이 블로그에 자동 반영
- **협업 가능**: 필요 시 다른 사람과 콘텐츠 협업 가능
- **API 지원**: 공식 Notion API를 통한 안정적인 데이터 연동

---

## 2. 주요 기능

### 2.1 Notion 연동

- Notion 데이터베이스와 블로그 연동
- 실시간 콘텐츠 동기화
- Notion 블록을 HTML로 렌더링

### 2.2 글 목록

- 최신순 정렬된 포스트 목록
- 페이지네이션 또는 무한 스크롤
- 썸네일, 제목, 요약, 작성일 표시

### 2.3 글 상세 페이지

- Notion 콘텐츠 렌더링 (텍스트, 코드, 이미지, 표 등)
- 코드 하이라이팅
- 목차(TOC) 자동 생성
- 이전/다음 글 네비게이션

### 2.4 카테고리 필터링

- 카테고리별 글 목록 필터링
- 카테고리 페이지 제공

### 2.5 검색 기능

- 제목 및 내용 기반 검색
- 실시간 검색 결과 표시

### 2.6 반응형 디자인

- 모바일, 태블릿, 데스크탑 대응
- 모바일 친화적인 네비게이션

---

## 3. 기술 스택

### 3.1 프론트엔드

| 기술         | 버전   | 용도                         |
| ------------ | ------ | ---------------------------- |
| Next.js      | 15     | React 프레임워크, App Router |
| React        | 19     | UI 라이브러리                |
| TypeScript   | 5.x    | 타입 안정성                  |
| Tailwind CSS | 3.x    | 스타일링                     |
| shadcn/ui    | latest | UI 컴포넌트                  |

### 3.2 백엔드/API

| 기술               | 용도               |
| ------------------ | ------------------ |
| Notion API         | 콘텐츠 데이터 소스 |
| Next.js API Routes | 서버 사이드 로직   |

### 3.3 배포 및 인프라

| 기술                                  | 용도               |
| ------------------------------------- | ------------------ |
| Vercel                                | 호스팅 및 배포     |
| ISR (Incremental Static Regeneration) | 정적 페이지 재생성 |

---

## 4. Notion 데이터베이스 구조

### 4.1 데이터베이스 속성

| 속성명    | 타입         | 설명                                     |
| --------- | ------------ | ---------------------------------------- |
| Title     | Title        | 포스트 제목                              |
| Category  | Select       | 카테고리 (예: Frontend, Backend, DevOps) |
| Tags      | Multi-select | 태그 목록                                |
| Published | Date         | 발행일                                   |
| Status    | Select       | 상태 (Draft, Published)                  |
| Content   | Page Content | 본문 내용 (Notion 페이지)                |

### 4.2 예시 카테고리

- Frontend
- Backend
- DevOps
- Database
- Algorithm
- Career

---

## 5. 화면 구성

### 5.1 홈 페이지 (`/`)

- 히어로 섹션 (블로그 소개)
- 최신 포스트 목록
- 카테고리 네비게이션
- 검색 입력창

### 5.2 글 상세 페이지 (`/posts/[slug]`)

- 포스트 헤더 (제목, 작성일, 카테고리, 태그)
- 목차 (사이드바 또는 상단)
- 본문 콘텐츠
- 이전/다음 글 링크

### 5.3 카테고리 페이지 (`/categories/[category]`)

- 해당 카테고리의 포스트 목록
- 카테고리 설명
- 정렬 옵션

---

## 6. MVP (Minimum Viable Product) 범위

### 6.1 MVP에 포함

- [x] Notion 데이터베이스 연동
- [x] 포스트 목록 페이지
- [x] 포스트 상세 페이지
- [x] 카테고리 필터링
- [x] 기본 반응형 디자인
- [x] SEO 메타태그

### 6.2 MVP 이후 기능 (Phase 2+)

- [ ] 검색 기능
- [ ] 다크 모드
- [ ] 댓글 시스템 (Giscus)
- [ ] RSS 피드
- [ ] 조회수 통계
- [ ] 소셜 공유 버튼

---

## 7. 구현 단계 (로드맵)

### Phase 1: 프로젝트 초기 설정

- Next.js 15 프로젝트 생성
- TypeScript 설정
- Tailwind CSS 및 shadcn/ui 설정
- 프로젝트 구조 설정
- Notion API 클라이언트 설정

### Phase 2: Notion 연동

- Notion 데이터베이스 생성 및 속성 설정
- Notion API 연동 구현
- 포스트 데이터 타입 정의
- 데이터 페칭 유틸리티 함수 구현

### Phase 3: 핵심 페이지 구현

- 레이아웃 컴포넌트 (Header, Footer, Navigation)
- 홈 페이지 구현
- 포스트 목록 컴포넌트
- 포스트 상세 페이지
- Notion 블록 렌더러 구현

### Phase 4: 부가 기능 구현

- 카테고리 페이지
- 태그 필터링
- 페이지네이션
- 코드 하이라이팅

### Phase 5: 최적화 및 배포

- SEO 최적화 (메타태그, sitemap, robots.txt)
- 성능 최적화 (이미지, 번들 사이즈)
- ISR 설정
- Vercel 배포

---

## 8. 참고 사항

### 8.1 환경 변수

```env
NOTION_API_KEY=secret_xxx
NOTION_DATABASE_ID=xxx
```

### 8.2 폴더 구조 (예상)

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── posts/
│   │   └── [slug]/
│   │       └── page.tsx
│   └── categories/
│       └── [category]/
│           └── page.tsx
├── components/
│   ├── ui/           # shadcn/ui 컴포넌트
│   ├── layout/       # Header, Footer 등
│   └── post/         # 포스트 관련 컴포넌트
├── lib/
│   ├── notion.ts     # Notion API 클라이언트
│   └── utils.ts      # 유틸리티 함수
└── types/
    └── post.ts       # 타입 정의
```
