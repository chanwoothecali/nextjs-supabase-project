"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createProfileAction, updateProfileAction } from "@/app/protected/profile/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Profile } from "@/lib/types/profile";
import { cn } from "@/lib/utils";

interface ProfileFormProps extends React.ComponentPropsWithoutRef<"div"> {
  profile?: Profile;
  initialData?: { fullName: string; avatarUrl: string };
}

export function ProfileForm({ className, profile, initialData, ...props }: ProfileFormProps) {
  const isEdit = !!profile;
  const [username, setUsername] = useState(profile?.username ?? "");
  const [fullName, setFullName] = useState(profile?.full_name ?? initialData?.fullName ?? "");
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url ?? initialData?.avatarUrl ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.set("username", username);
      formData.set("fullName", fullName);
      formData.set("avatarUrl", avatarUrl);

      const action = isEdit ? updateProfileAction : createProfileAction;
      const result = await action(formData);

      if (!result.success) {
        setError(result.error ?? "오류가 발생했습니다.");
        return;
      }

      router.push("/protected");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{isEdit ? "프로필 수정" : "프로필 설정"}</CardTitle>
          <CardDescription>
            {isEdit ? "프로필 정보를 수정합니다." : "서비스 이용을 위해 프로필을 설정해주세요."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">사용자명</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="my_username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  2~30자, 영문/숫자/언더스코어만 사용 가능
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fullName">이름</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="홍길동"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="avatarUrl">아바타 URL</Label>
                <Input
                  id="avatarUrl"
                  type="url"
                  placeholder="https://example.com/avatar.png"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading
                  ? isEdit
                    ? "수정 중..."
                    : "설정 중..."
                  : isEdit
                    ? "프로필 수정"
                    : "프로필 설정"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
