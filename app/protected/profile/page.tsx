import { ProfileForm } from "@/components/profile-form";
import { requireProfile } from "@/lib/profile-guard";

export default async function ProfilePage() {
  const profile = await requireProfile();

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ProfileForm profile={profile} />
      </div>
    </div>
  );
}
