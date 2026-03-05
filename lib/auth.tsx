
import { hasCompletedProfile } from "@/lib/profile";
import { supabase } from "@/lib/supabaseClient";

export const MISSING_SUPABASE_ENV_ERROR =
  "Missing Supabase env. Create .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.";

type AuthResult =
  | {
      ok: true;
      status: "created";
    }
  | {
      ok: false;
      error: string;
      reason?: "account_exists";
    }
  ;

type SignInResult =
  | {
      ok: true;
      redirectTo: "/home" | "/onboarding";
    }
  | {
      ok: false;
      error: string;
    };

export async function signInWithEmailPassword(
  email: string,
  password: string
): Promise<SignInResult> {
  if (!supabase) {
    return { ok: false, error: MISSING_SUPABASE_ENV_ERROR };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: error.message };

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) return { ok: false, error: userError.message };

  const redirectTo = hasCompletedProfile(userData.user) ? "/home" : "/onboarding";
  return { ok: true, redirectTo };
}

export async function signUpWithEmailPassword(
  email: string,
  password: string
): Promise<AuthResult> {
  if (!supabase) {
    return { ok: false, error: MISSING_SUPABASE_ENV_ERROR };
  }

  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { ok: false, error: error.message };

  const identities = data.user?.identities;
  const isExistingAccount = Array.isArray(identities) && identities.length === 0;
  if (isExistingAccount) {
    return {
      ok: false,
      error: "An account with this email already exists. Please sign in instead.",
      reason: "account_exists",
    };
  }

  return { ok: true, status: "created" };
}
