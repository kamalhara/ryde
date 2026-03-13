/* eslint-disable no-unused-vars */
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
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

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({
          session: signInAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              // Check for tasks and navigate to custom UI to help users resolve them
              // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
              console.log(session?.currentTask);
              return;
            }

            router.push("/home");
          },
        });
      } else if (signInAttempt.status === "needs_second_factor") {
        // Check if email_code is a valid second factor
        // This is required when Client Trust is enabled and the user
        // is signing in from a new device.
        // See https://clerk.com/docs/guides/secure/client-trust
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
        // If the status is not complete, check why. User may need to
        // complete further steps.
        Alert.alert(
          "Error",
          "Sign-in not complete. " + JSON.stringify(signInAttempt, null, 2),
        );
      }
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error("Auth error:", err);
      const message =
        err?.errors?.[0]?.longMessage || err?.message || JSON.stringify(err);

      const lower = String(message).toLowerCase();

      // Only redirect to home for explicit "already signed in/logged in" messages
      if (/already (signed in|logged in)/i.test(message)) {
        router.replace("/home");
        return;
      }

      // Friendly message for common credential errors
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
        Alert.alert("Error", "Invalid email or password");
        return;
      }

      // For any other unknown error, show a generic message instead of raw error
      Alert.alert(
        "Error",
        "Login failed. Please check your credentials and try again.",
      );
    }
  }, [isLoaded, signIn, setActive, router, form.email, form.password]);

  // Handle the submission of the email verification code
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
              // Check for tasks and navigate to custom UI to help users resolve them
              // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
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
    <ScrollView className="bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="absolute  text-black bottom-5 left-5 text-2xl font-semibold">
            Welcome Back
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(value) => {
              setForm({ ...form, email: value });
            }}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            value={form.password}
            onChangeText={(value) => {
              setForm({ ...form, password: value });
            }}
          />
          <CustomButton
            title="Login"
            className="mt-6"
            onPress={onSignInPress}
            onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
          />
        </View>

        <OAuth />
        <Link
          href="/signup"
          className="text-center  text-lg  text-gray-500 mt-10"
        >
          <Text className="text-md font-semibold">
            Don&apos;t have an account?{" "}
            <Text className="text-blue-500">Sign Up</Text>
          </Text>
        </Link>
      </View>
    </ScrollView>
  );
}
