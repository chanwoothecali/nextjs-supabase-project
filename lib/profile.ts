import { createClient } from "@/lib/supabase/server";
import type { Profile, ProfileFormData, ProfileResult } from "@/lib/types/profile";

// 현재 로그인한 사용자의 프로필 조회
export async function getMyProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();

  if (!claims?.claims?.sub) {
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", claims.claims.sub as string)
    .single();

  if (error) {
    return null;
  }

  return data;
}

// 프로필 생성
export async function createProfile(formData: ProfileFormData): Promise<ProfileResult> {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();

  if (!claims?.claims?.sub) {
    return { success: false, error: "인증되지 않은 사용자입니다." };
  }

  const { error } = await supabase.from("profiles").insert({
    id: claims.claims.sub as string,
    username: formData.username,
    full_name: formData.fullName,
    avatar_url: formData.avatarUrl || null,
  });

  if (error) {
    if (error.code === "23505") {
      return { success: false, error: "이미 사용 중인 사용자명입니다." };
    }
    return { success: false, error: error.message };
  }

  return { success: true };
}

// 프로필 수정
export async function updateProfile(formData: ProfileFormData): Promise<ProfileResult> {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();

  if (!claims?.claims?.sub) {
    return { success: false, error: "인증되지 않은 사용자입니다." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      username: formData.username,
      full_name: formData.fullName,
      avatar_url: formData.avatarUrl || null,
    })
    .eq("id", claims.claims.sub as string);

  if (error) {
    if (error.code === "23505") {
      return { success: false, error: "이미 사용 중인 사용자명입니다." };
    }
    return { success: false, error: error.message };
  }

  return { success: true };
}
