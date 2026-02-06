import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import OAuth from "../components/OAuth";
import { icons, images } from "../constants";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const hello = "";
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();

  const [verification, setVerification] = useState({
    state: "default",
    code: "",
    error: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture code
      setVerification({ ...verification, state: "pending" });
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      const message =
        err?.errors?.[0]?.longMessage || err?.message || JSON.stringify(err);

      if (String(message).toLowerCase().includes("already")) {
        router.replace("/home");
        return;
      }

      Alert.alert("Error", message);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({
          session: signUpAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              // Check for tasks and navigate to custom UI to help users resolve them
              // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
              console.log(session?.currentTask);
              return;
            }

            setVerification({ ...verification, state: "success" });
          },
        });
      } else {
        // If the status is not complete, check why. User may need to
        setVerification({
          ...verification,
          error: "Verification failed. Please try again.",
        });
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
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
    <ScrollView className="bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="absolute  text-black bottom-5 left-5 text-2xl font-semibold">
            Create your account
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => {
              setForm({ ...form, name: value });
            }}
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
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
            title="Sign Up"
            className="mt-6"
            onPress={onSignUpPress}
          />
          <OAuth />
          <Link
            href="/login"
            className="text-center  text-lg  text-gray-500 mt-10"
          >
            <Text className="text-md font-semibold">
              Already have an account?{" "}
              <Text className="text-blue-500">Login</Text>
            </Text>
          </Link>
        </View>

        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") {
              setShowSuccessModal(true);
            }
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="font-bold text-2xl mb-2"> Verification</Text>
            <Text className="mb-5">
              We have sent a verification code to {form.email}.
            </Text>
            <InputField
              label="Code"
              placeholder="12345"
              icon={icons.lock}
              keyBoardType="numeric"
              value={verification.code}
              onChangeText={(code) => {
                setVerification({ ...verification, code });
              }}
            />
            {verification.error && (
              <Text className="text-red-500 mt-1 text-sm">
                {verification.error}
              </Text>
            )}
            <CustomButton
              title="Verify"
              className="mt-5 bg-green-600"
              onPress={onVerifyPress}
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] self-center my-5 mx-auto"
            />
            <Text className="text-center text-3xl font-bold">Verified</Text>
            <Text className="text-center text-gray-500 mt-2 text-base">
              Your have successfully verified your account.
            </Text>
            <CustomButton
              title="Browse home"
              className="mt-5"
              onPress={() => {
                setShowSuccessModal(false);
                router.push("/home");
              }}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
}
