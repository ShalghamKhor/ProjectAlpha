import type { User } from "@supabase/supabase-js";

export function hasCompletedProfile(user: User | null): boolean {
  if (!user) return false;

  const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
  const fullName = typeof meta.full_name === "string" ? meta.full_name.trim() : "";
  const city = typeof meta.city === "string" ? meta.city.trim() : "";
  const phone = typeof meta.phone === "string" ? meta.phone.trim() : "";
  const markedComplete = meta.profile_completed === true;

  return markedComplete && fullName.length > 0 && city.length > 0 && phone.length > 0;
}
