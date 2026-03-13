import { useSSO } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Alert, Image, Text, View } from "react-native";
import { icons } from "../constants";
import { fetchAPI } from "../lib/fetch";
import CustomButton from "./CustomButton";

const OAuth = () => {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const handleOAuthError = useCallback(
    (err, provider) => {
      console.error(`${provider} OAuth Error:`, err);
      const message =
        err?.errors?.[0]?.longMessage || err?.message || JSON.stringify(err);
      const lower = String(message).toLowerCase();

      if (
        lower.includes("already") ||
        lower.includes("signed in") ||
        lower.includes("logged in") ||
        lower.includes("session exists") ||
        lower.includes("single session")
      ) {
        router.replace("/(authenticated)/(tabs)/home");
        return;
      }

      Alert.alert(
        "Error",
        `Failed to sign in with ${provider}. Please try again.`,
      );
    },
    [router],
  );

  const handleGoogleLogin = useCallback(async () => {
    try {
      const { createdSessionId, setActive, signUp } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: AuthSession.makeRedirectUri({
          scheme: "ryde",
          path: "/(authenticated)/(tabs)/home",
        }),
      });

      if (createdSessionId) {
        if (signUp?.createdUserId) {
          await fetchAPI("/(api)/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: `${signUp.firstName || ""} ${signUp.lastName || ""}`.trim(),
              email: signUp.emailAddress,
              clerkId: signUp.createdUserId,
            }),
          });
        }

        await setActive({ session: createdSessionId });
        router.replace("/(authenticated)/(tabs)/home");
      }
    } catch (err) {
      handleOAuthError(err, "Google");
    }
  }, [startSSOFlow, router, handleOAuthError]);

  const handleAppleLogin = useCallback(async () => {
    try {
      const { createdSessionId, setActive, signUp } = await startSSOFlow({
        strategy: "oauth_apple",
        redirectUrl: AuthSession.makeRedirectUri({
          scheme: "ryde",
          path: "/(authenticated)/(tabs)/home",
        }),
      });

      if (createdSessionId) {
        if (signUp?.createdUserId) {
          await fetchAPI("/(api)/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: `${signUp.firstName || ""} ${signUp.lastName || ""}`.trim(),
              email: signUp.emailAddress,
              clerkId: signUp.createdUserId,
            }),
          });
        }

        await setActive({ session: createdSessionId });
        router.replace("/(authenticated)/(tabs)/home");
      }
    } catch (err) {
      handleOAuthError(err, "Apple");
    }
  }, [startSSOFlow, router, handleOAuthError]);

  return (
    <View className="w-full mt-6">
      <View className="flex-row items-center justify-center">
        <View className="flex-1 h-[1px] bg-gray-200" />
        <Text
          className="text-gray-400 text-sm mx-4"
          style={{ fontFamily: "Jakarta-Medium" }}
        >
          or continue with
        </Text>
        <View className="flex-1 h-[1px] bg-gray-200" />
      </View>

      {/* Google Sign In */}
      <CustomButton
        title="Continue with Google"
        className="w-full mt-4"
        bgVariant="outline"
        textVariant="primary"
        iconLeft={<Image source={icons.google} className="w-5 h-5 mx-2" />}
        onPress={handleGoogleLogin}
        onPressIn={() =>
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        }
      />

      {/* Apple Sign In */}
      <CustomButton
        title="Continue with Apple"
        className="w-full mt-3 bg-black"
        textVariant="default"
        iconLeft={
          <Text
            style={{
              fontSize: 20,
              color: "#fff",
              marginRight: 8,
              marginTop: -2,
            }}
          >
            
          </Text>
        }
        onPress={handleAppleLogin}
        onPressIn={() =>
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        }
      />
    </View>
  );
};

export default OAuth;
