import type { Database } from "@/lib/supabase/database.types";
import type { Profile } from "@/lib/types/profile";

// DB 스키마에서 추출한 타입
export type Place = Database["public"]["Tables"]["places"]["Row"];
export type PlaceInsert = Database["public"]["Tables"]["places"]["Insert"];
export type PlaceUpdate = Database["public"]["Tables"]["places"]["Update"];
export type PlaceCategory = Database["public"]["Enums"]["place_category"];

// profiles JOIN된 장소 타입
export type PlaceWithAuthor = Place & {
  profiles: Pick<Profile, "username" | "full_name"> | null;
};

// 폼용 타입
export type PlaceFormData = {
  name: string;
  description: string;
  category: PlaceCategory;
  address: string;
  latitude: number;
  longitude: number;
};

// 반환용 타입
export type PlaceResult = {
  success: boolean;
  error?: string;
  id?: string;
};

// 검색 파라미터 타입
export type PlaceSearchParams = {
  q?: string;
  category?: PlaceCategory;
  sort?: "latest" | "rating";
  page?: number;
};

// 목록 응답 타입
export type PlaceListResponse = {
  places: PlaceWithAuthor[];
  totalCount: number;
  page: number;
  pageSize: number;
};
