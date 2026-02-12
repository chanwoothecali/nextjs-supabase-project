import { redirect } from "next/navigation";

import { getMyProfile } from "@/lib/profile";
import type { Profile } from "@/lib/types/profile";

// 프로필 존재 확인 가드 - 없으면 설정 페이지로 리다이렉트
export async function requireProfile(): Promise<Profile> {
  const profile = await getMyProfile();

  if (!profile) {
    redirect("/protected/profile/setup");
  }

  return profile;
}
