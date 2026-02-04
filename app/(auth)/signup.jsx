import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import { icons, images } from "../constants";
import OAuth from "../components/OAuth";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const signupHandler = async () => {};
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
            onPress={signupHandler}
          />
        </View>

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
    </ScrollView>
  );
}
