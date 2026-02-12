import type { Database } from "@/lib/supabase/database.types";

// DB 스키마에서 추출한 타입
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

// 폼용 타입
export type ProfileFormData = {
  username: string;
  fullName: string;
  avatarUrl: string;
};

// 반환용 타입
export type ProfileResult = {
  success: boolean;
  error?: string;
};
