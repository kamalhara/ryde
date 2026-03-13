import { Text, TouchableOpacity } from "react-native";
const getBgVariantStyle = (variant) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    default:
      return "bg-[#0286ff]";
  }
};

const getTextVariantStyle = (variant) => {
  switch (variant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-red-100";
    case "success":
      return "text-green-100";
    default:
      return "text-white";
  }
};
const CustomButton = ({
  title,
  onPress,
  className,
  bgVariant = "primary",
  textVariant = "default",
  iconLeft,
  iconRight,
  onPressIn,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={onPressIn}
      activeOpacity={0.8}
      className={`w-full rounded-full py-4 px-6 flex flex-row justify-center items-center ${getBgVariantStyle(bgVariant)} ${className}`}
      style={{
        shadowColor: bgVariant === "primary" ? "#0286ff" : "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
      }}
    >
      {iconLeft && iconLeft}
      <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>
        {title}
      </Text>
      {iconRight && iconRight}
    </TouchableOpacity>
  );
};

export default CustomButton;
