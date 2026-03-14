import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import { useDevAuthStore } from "../../store";

export default function AuthenticatedLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const isDevLoggedIn = useDevAuthStore((s) => s.isDevLoggedIn);

  if (!isLoaded && !isDevLoggedIn) {
    return null;
  }

  if (!isSignedIn && !isDevLoggedIn) {
    return <Redirect href="/(auth)/welcome" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="find-ride" options={{ headerShown: false }} />
      <Stack.Screen name="confirm-ride" options={{ headerShown: false }} />
      <Stack.Screen name="book-ride" options={{ headerShown: false }} />
    </Stack>
  );
}
