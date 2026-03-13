import { useSignIn } from "@clerk/clerk-expo";
import * as Haptics from "expo-haptics";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ReactNativeModal from "react-native-modal";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import OAuth from "../../components/OAuth";
import { icons, images } from "../../constants";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [showEmailCode, setShowEmailCode] = useState(false);
  const [code, setCode] = React.useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;
    setIsLoading(true);

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({
          session: signInAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask);
              return;
            }
            Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Success,
            );
            router.push("/home");
          },
        });
      } else if (signInAttempt.status === "needs_second_factor") {
        const emailCodeFactor = signInAttempt.supportedSecondFactors?.find(
          (factor) => factor.strategy === "email_code",
        );

        if (emailCodeFactor) {
          await signIn.prepareSecondFactor({
            strategy: "email_code",
            emailAddressId: emailCodeFactor.emailAddressId,
          });
          setShowEmailCode(true);
        }
      } else {
        Alert.alert(
          "Error",
          "Sign-in not complete. " + JSON.stringify(signInAttempt, null, 2),
        );
      }
    } catch (err) {
      console.error("Auth error:", err);
      const message =
        err?.errors?.[0]?.longMessage || err?.message || JSON.stringify(err);

      const lower = String(message).toLowerCase();

      if (/already (signed in|logged in)/i.test(message)) {
        router.replace("/home");
        return;
      }

      if (
        lower.includes("invalid") ||
        lower.includes("wrong") ||
        lower.includes("not found") ||
        lower.includes("no user") ||
        lower.includes("couldn't find") ||
        lower.includes("identifier") ||
        lower.includes("password") ||
        lower.includes("credentials")
      ) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert("Error", "Invalid email or password");
        return;
      }

      Alert.alert(
        "Error",
        "Login failed. Please check your credentials and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [isLoaded, signIn, setActive, router, form.email, form.password]);

  const onVerifyPress = React.useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.attemptSecondFactor({
        strategy: "email_code",
        code,
      });

      if (signInAttempt.status === "complete") {
        await setActive({
          session: signInAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask);
              return;
            }
            router.replace("/");
          },
        });
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, signIn, setActive, router, code]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        className="bg-white"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 bg-white">
          {/* Hero Section */}
          <View className="relative w-full h-[280px]">
            <Image
              source={images.signUpCar}
              className="w-full h-full"
              resizeMode="cover"
            />
            <View className="absolute bottom-0 left-0 right-0 px-6 pb-5">
              <Text
                className="text-gray-900 text-3xl font-bold"
                style={{ fontFamily: "Jakarta-Bold" }}
              >
                Welcome{"\n"}back
              </Text>
              <Text className="text-gray-500 text-sm mt-1">
                Log in to continue your ride
              </Text>
            </View>
          </View>

          {/* Form Section */}
          <View className="px-6 pt-6 pb-4">
            <InputField
              label="Email"
              placeholder="Enter your email"
              icon={icons.email}
              value={form.email}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(value) => setForm({ ...form, email: value })}
            />
            <InputField
              label="Password"
              placeholder="Enter your password"
              icon={icons.lock}
              value={form.password}
              secureTextEntry
              onChangeText={(value) => setForm({ ...form, password: value })}
            />

            {/* Remember Me & Forgot Password Row */}
            <View className="flex-row items-center justify-between mt-2 mb-2">
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setRememberMe(!rememberMe);
                }}
                activeOpacity={0.7}
              >
                <Switch
                  value={rememberMe}
                  onValueChange={(val) => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setRememberMe(val);
                  }}
                  trackColor={{ false: "#e5e7eb", true: "#bfdbfe" }}
                  thumbColor={rememberMe ? "#0286ff" : "#f4f4f5"}
                  ios_backgroundColor="#e5e7eb"
                  style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                />
                <Text
                  className="text-gray-500 text-sm ml-1"
                  style={{ fontFamily: "Jakarta-Medium" }}
                >
                  Remember me
                </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text
                  className="text-[#0286ff] text-sm"
                  style={{ fontFamily: "Jakarta-SemiBold" }}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            <CustomButton
              title="Log In"
              className="mt-4"
              onPress={onSignInPress}
              loading={isLoading}
              disabled={isLoading}
              onPressIn={() =>
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
              }
            />

            <OAuth />

            {/* Sign Up Link */}
            <View className="flex-row justify-center mt-8 mb-4">
              <Text className="text-gray-500 text-base">
                Don&apos;t have an account?{" "}
              </Text>
              <Link href="/signup" asChild>
                <TouchableOpacity>
                  <Text
                    className="text-[#0286ff] text-base font-bold"
                    style={{ fontFamily: "Jakarta-Bold" }}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>

          {/* 2FA Verification Modal */}
          <ReactNativeModal
            isVisible={showEmailCode}
            backdropOpacity={0.5}
            animationIn="slideInUp"
            animationOut="slideOutDown"
          >
            <View
              className="bg-white px-7 py-8 rounded-3xl"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.15,
                shadowRadius: 20,
                elevation: 10,
              }}
            >
              <View className="w-16 h-16 bg-blue-50 rounded-full items-center justify-center self-center mb-5">
                <Image
                  source={icons.lock}
                  className="w-7 h-7"
                  tintColor="#0286ff"
                />
              </View>

              <Text
                className="text-2xl text-center text-gray-900 mb-2"
                style={{ fontFamily: "Jakarta-Bold" }}
              >
                Two-Factor Auth
              </Text>
              <Text className="text-gray-400 text-center mb-6 text-sm">
                Enter the verification code sent to your email
              </Text>

              <InputField
                label="Verification Code"
                placeholder="Enter code"
                icon={icons.lock}
                keyboardType="numeric"
                value={code}
                onChangeText={setCode}
              />

              <CustomButton
                title="Verify"
                className="mt-5"
                bgVariant="success"
                onPress={onVerifyPress}
                onPressIn={() =>
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                }
              />

              <TouchableOpacity
                onPress={() => setShowEmailCode(false)}
                className="mt-4 items-center py-2"
              >
                <Text className="text-gray-400 text-sm">Cancel</Text>
              </TouchableOpacity>
            </View>
          </ReactNativeModal>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
