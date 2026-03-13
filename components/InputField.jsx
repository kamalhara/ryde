import { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { icons } from "../constants";

const InputField = ({
  label,
  labelStyle,
  icon,
  containerStyle,
  secureTextEntry,
  inputStyle,
  iconStyle,
  className,
  keyboardType = "default",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="w-full my-2">
          <Text
            className={`text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide ${labelStyle}`}
            style={{ fontFamily: "Jakarta-SemiBold", fontSize: 12 }}
          >
            {label}
          </Text>

          <View
            className={`flex flex-row justify-start items-center relative rounded-2xl ${containerStyle}`}
            style={{
              backgroundColor: isFocused ? "#f0f7ff" : "#f9fafb",
              borderWidth: 1.5,
              borderColor: isFocused ? "#0286ff" : "#e5e7eb",
            }}
          >
            {icon && (
              <Image
                source={icon}
                className={`w-5 h-5 ml-4 ${iconStyle}`}
                resizeMode="contain"
                tintColor={isFocused ? "#0286ff" : "#9ca3af"}
              />
            )}
            <TextInput
              className={`rounded-full p-4 text-[15px] flex-1 ${inputStyle} text-left`}
              style={{ fontFamily: "Jakarta-Medium", color: "#1f2937" }}
              secureTextEntry={secureTextEntry && !isPasswordVisible}
              keyboardType={keyboardType}
              placeholderTextColor="#9ca3af"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...props}
            />
            {secureTextEntry && (
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                className="pr-4"
              >
                <Image
                  source={icons.eyecross}
                  className="w-5 h-5"
                  resizeMode="contain"
                  tintColor={isPasswordVisible ? "#0286ff" : "#9ca3af"}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
