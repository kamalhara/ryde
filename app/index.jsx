import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { useDevAuthStore } from "../store";

export default function Index() {
  const { isSignedIn } = useAuth();
  const isDevLoggedIn = useDevAuthStore((s) => s.isDevLoggedIn);

  if (isSignedIn || isDevLoggedIn) {
    return <Redirect href={"/home"} />;
  }
  return <Redirect href="/welcome" />;
}

