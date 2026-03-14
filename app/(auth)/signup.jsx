import { useSignUp } from "@clerk/clerk-expo";
import * as Haptics from "expo-haptics";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ReactNativeModal from "react-native-modal";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import OAuth from "../../components/OAuth";
import { icons, images } from "../../constants";

const fetchAPI = async (url, options) => {
  try {
    const response = await fetch(`/${url}`, {
      method: options?.method || "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: options?.body,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

const getPasswordStrength = (password) => {
  if (!password) return { level: 0, label: "", color: "transparent" };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { level: 1, label: "Weak", color: "#ef4444" };
  if (score <= 2) return { level: 2, label: "Fair", color: "#f59e0b" };
  if (score <= 3) return { level: 3, label: "Good", color: "#0286ff" };
  return { level: 4, label: "Strong", color: "#22c55e" };
};

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();

  const [verification, setVerification] = useState({
    state: "default",
    code: "",
    error: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({ ...verification, state: "pending" });
    } catch (err) {
      const message =
        err?.errors?.[0]?.longMessage || err?.message || JSON.stringify(err);
      if (String(message).toLowerCase().includes("already")) {
        router.replace("/home");
        return;
      }
      Alert.alert("Error", message);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });
      if (signUpAttempt.status === "complete") {
        await fetchAPI("(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: signUpAttempt.createdUserId,
          }),
        });
        await setActive({
          session: signUpAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask);
              return;
            }
            setVerification({ ...verification, state: "success" });
          },
        });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed. Please try again.",
        });
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      const message =
        err?.errors?.[0]?.longMessage || err?.message || JSON.stringify(err);
      if (String(message).toLowerCase().includes("already")) {
        router.replace("/home");
        return;
      }
      console.error(JSON.stringify(err, null, 2));
    }
  };

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
          <View className="relative w-full h-[260px]">
            <Image
              source={images.signUpCar}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          {/* Form Section */}
          <View className="bg-white rounded-t-[32px] -mt-10 px-6 pt-8 pb-4 relative z-10 flex-1">
            <View className="mb-6">
              <Text
                className="text-gray-900 text-3xl"
                style={{ fontFamily: "Jakarta-Bold" }}
              >
                Create your account
              </Text>
              <Text
                className="text-gray-500 text-base mt-2"
                style={{ fontFamily: "Jakarta-Medium" }}
              >
                Sign up to get started with Ryde
              </Text>
            </View>

            <InputField
              label="Full Name"
              placeholder="Enter your name"
              icon={icons.person}
              value={form.name}
              onChangeText={(value) => setForm({ ...form, name: value })}
            />
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

            {/* Password Strength Indicator */}
            {form.password.length > 0 && (
              <View className="mt-1 mb-2">
                <View className="flex-row gap-x-1.5">
                  {[1, 2, 3, 4].map((bar) => (
                    <View
                      key={bar}
                      className="flex-1 h-1.5 rounded-full"
                      style={{
                        backgroundColor:
                          bar <= getPasswordStrength(form.password).level
                            ? getPasswordStrength(form.password).color
                            : "#e5e7eb",
                      }}
                    />
                  ))}
                </View>
                <Text
                  className="text-xs mt-1.5"
                  style={{
                    fontFamily: "Jakarta-Medium",
                    color: getPasswordStrength(form.password).color,
                  }}
                >
                  {getPasswordStrength(form.password).label}
                </Text>
              </View>
            )}

            {/* Sign Up Button */}
            <CustomButton
              title="Sign Up"
              className="mt-6"
              onPress={
                form.name && form.email && form.password
                  ? onSignUpPress
                  : () => {
                      Haptics.notificationAsync(
                        Haptics.NotificationFeedbackType.Warning,
                      );
                      Alert.alert("Error", "Please fill all fields");
                    }
              }
              onPressIn={() =>
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
              }
            />

            {/* Dev Login - subtle */}
            <TouchableOpacity
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                const { devLogin } =
                  require("../../store").useDevAuthStore.getState();
                devLogin();
                router.replace("/(authenticated)/(tabs)/home");
              }}
              className="mt-3 py-2 items-center"
            >
              <Text className="text-gray-400 text-xs">Dev Login →</Text>
            </TouchableOpacity>

            <OAuth />

            {/* Login Link */}
            <View className="flex-row justify-center mt-8 mb-2">
              <Text
                className="text-gray-500 text-base"
                style={{ fontFamily: "Jakarta-Medium" }}
              >
                Already have an account?{" "}
              </Text>
              <Link href="/login" asChild>
                <TouchableOpacity>
                  <Text
                    className="text-[#0286ff] text-base"
                    style={{ fontFamily: "Jakarta-Bold" }}
                  >
                    Log In
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>

            {/* Terms of Service */}
            <Text
              className="text-center text-gray-400 text-xs mt-4 mb-4 px-6 leading-5"
              style={{ fontFamily: "Jakarta-Medium" }}
            >
              By signing up, you agree to our{" "}
              <Text className="text-[#0286ff]">Terms of Service</Text> and{" "}
              <Text className="text-[#0286ff]">Privacy Policy</Text>
            </Text>
          </View>

          {/* Verification Modal */}
          <ReactNativeModal
            isVisible={verification.state === "pending"}
            onModalHide={() => {
              if (verification.state === "success") {
                setShowSuccessModal(true);
              }
            }}
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
              {/* Icon */}
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
                Verification
              </Text>
              <Text className="text-gray-400 text-center mb-6 text-sm">
                We&apos;ve sent a 6-digit code to{"\n"}
                <Text className="text-gray-600 font-semibold">
                  {form.email}
                </Text>
              </Text>

              <InputField
                label="Verification Code"
                placeholder="Enter 6-digit code"
                icon={icons.lock}
                keyboardType="numeric"
                value={verification.code}
                onChangeText={(code) =>
                  setVerification({ ...verification, code })
                }
              />

              {verification.error && (
                <View className="bg-red-50 rounded-xl px-4 py-3 mt-2 flex-row items-center">
                  <Text className="text-red-500 text-sm flex-1">
                    {verification.error}
                  </Text>
                </View>
              )}

              <CustomButton
                title="Verify Email"
                className="mt-5"
                bgVariant="success"
                onPress={onVerifyPress}
                onPressIn={() =>
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                }
              />

              <TouchableOpacity className="mt-4 items-center py-2">
                <Text className="text-gray-400 text-sm">
                  Didn&apos;t receive the code?{" "}
                  <Text className="text-[#0286ff] font-semibold">Resend</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ReactNativeModal>

          {/* Success Modal */}
          <ReactNativeModal
            isVisible={showSuccessModal}
            backdropOpacity={0.5}
            animationIn="zoomIn"
            animationOut="zoomOut"
          >
            <View
              className="bg-white px-7 py-8 rounded-3xl items-center"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.15,
                shadowRadius: 20,
                elevation: 10,
              }}
            >
              {/* Success checkmark with ring */}
              <View className="w-28 h-28 rounded-full bg-green-50 items-center justify-center mb-5">
                <View className="w-20 h-20 rounded-full bg-green-100 items-center justify-center">
                  <Image
                    source={images.check}
                    className="w-14 h-14"
                    resizeMode="contain"
                  />
                </View>
              </View>

              <Text
                className="text-2xl text-gray-900 text-center"
                style={{ fontFamily: "Jakarta-Bold" }}
              >
                You&apos;re all set!
              </Text>
              <Text className="text-gray-400 text-center mt-2 text-sm px-4">
                Your account has been verified successfully. Welcome to Ryde!
              </Text>

              <CustomButton
                title="Start Riding"
                className="mt-6 w-full"
                bgVariant="success"
                onPress={() => {
                  Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Success,
                  );
                  setShowSuccessModal(false);
                  router.push("/home");
                }}
              />
            </View>
          </ReactNativeModal>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
