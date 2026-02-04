import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import OAuth from "../components/OAuth";
import { icons, images } from "../constants";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const loginHandler = async () => {};
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
          <CustomButton title="Login" className="mt-6" onPress={loginHandler} />
        </View>

        <OAuth />
        <Link
          href="/signup"
          className="text-center  text-lg  text-gray-500 mt-10"
        >
          <Text className="text-md font-semibold">
            Don't have an account?{" "}
            <Text className="text-blue-500">Sign Up</Text>
          </Text>
        </Link>
      </View>
    </ScrollView>
  );
}
