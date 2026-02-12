import { redirect } from "next/navigation";

import { ProfileForm } from "@/components/profile-form";
import { getMyProfile } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";

export default async function ProfileSetupPage() {
  // 인증 확인
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) {
    redirect("/auth/login");
  }

  // 이미 프로필이 있으면 메인으로 리다이렉트
  const profile = await getMyProfile();

  if (profile) {
    redirect("/protected");
  }

  // OAuth 메타데이터에서 초기값 추출 (Google 로그인 등)
  const { data: userData } = await supabase.auth.getUser();
  const meta = userData?.user?.user_metadata;
  const initialData = {
    fullName: meta?.full_name ?? meta?.name ?? "",
    avatarUrl: meta?.avatar_url ?? meta?.picture ?? "",
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ProfileForm initialData={initialData} />
      </div>
    </div>
  );
}
