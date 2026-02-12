import { InfoIcon } from "lucide-react";

import { requireProfile } from "@/lib/profile-guard";

export default async function ProtectedPage() {
  const profile = await requireProfile();

  return (
    <div className="flex w-full flex-1 flex-col gap-12">
      <div className="w-full">
        <div className="flex items-center gap-3 rounded-md bg-accent p-3 px-5 text-sm text-foreground">
          <InfoIcon size="16" strokeWidth={2} />
          인증된 사용자만 볼 수 있는 페이지입니다.
        </div>
      </div>
      <div className="flex flex-col items-start gap-2">
        <h2 className="mb-4 text-2xl font-bold">
          환영합니다, {profile.full_name || profile.username}님!
        </h2>
        <div className="text-sm text-muted-foreground">
          <p>사용자명: {profile.username}</p>
          {profile.full_name && <p>이름: {profile.full_name}</p>}
        </div>
      </div>
    </div>
  );
}
