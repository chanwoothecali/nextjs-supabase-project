"use server";

import { createProfile, updateProfile } from "@/lib/profile";
import type { ProfileResult } from "@/lib/types/profile";

const USERNAME_REGEX = /^[a-zA-Z0-9_]{2,30}$/;

function validateFormData(
  formData: FormData,
): { username: string; fullName: string; avatarUrl: string } | { error: string } {
  const username = (formData.get("username") as string)?.trim() ?? "";
  const fullName = (formData.get("fullName") as string)?.trim() ?? "";
  const avatarUrl = (formData.get("avatarUrl") as string)?.trim() ?? "";

  if (!username) {
    return { error: "사용자명을 입력해주세요." };
  }

  if (!USERNAME_REGEX.test(username)) {
    return { error: "사용자명은 2~30자의 영문, 숫자, 언더스코어만 사용할 수 있습니다." };
  }

  return { username, fullName, avatarUrl };
}

// 프로필 생성 액션
export async function createProfileAction(formData: FormData): Promise<ProfileResult> {
  const validated = validateFormData(formData);

  if ("error" in validated) {
    return { success: false, error: validated.error };
  }

  return createProfile(validated);
}

// 프로필 수정 액션
export async function updateProfileAction(formData: FormData): Promise<ProfileResult> {
  const validated = validateFormData(formData);

  if ("error" in validated) {
    return { success: false, error: validated.error };
  }

  return updateProfile(validated);
}
