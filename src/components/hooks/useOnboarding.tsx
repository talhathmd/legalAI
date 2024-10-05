import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useOnboardingCheck(isLoggedIn: boolean, user: any) {
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      if (user.onboarded) {  // Check if onboarded property exists on the user object
        router.push("/dashboard"); // Redirect to dashboard if already onboarded
      } else {
        router.push("/onboarding"); // Redirect to onboarding if not onboarded
      }
    }
  }, [isLoggedIn, user, router]);
}
