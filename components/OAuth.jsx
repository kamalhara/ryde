import { useSSO } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Alert, Image, Text, View } from "react-native";
import { icons } from "../constants";
import { fetchAPI } from "../lib/fetch";
import CustomButton from "./CustomButton";

const OAuth = () => {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

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
        // Create user in database if this is a new signup
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
      console.error("OAuth Error:", err);
      Alert.alert("Error", "Failed to sign in with Google. Please try again.");
    }
  }, [startSSOFlow, router]);

  return (
    <View className="w-full">
      <View className="flex-row flex items-center justify-center mt-4">
        <View className="flex-1 h-[1px] bg-gray-300" />
        <Text className="text-lg mx-3">Or</Text>
        <View className="flex-1 h-[1px] bg-gray-300" />
      </View>
      <CustomButton
        title="Sign in with Google"
        className="w-full mt-4"
        bgVariant="outline"
        textVariant="primary"
        iconLeft={<Image source={icons.google} className="w-5 h-5 mx-2" />}
        onPress={handleGoogleLogin}
      />
    </View>
  );
};

export default OAuth;
