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
const CustomButton = ({
  title,
  onPress,
  className,
  bgVariant = "primary",
  textVariant = "default",
  iconLeft,
  iconRight,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full rounded-full p-4 flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)} ${className}`}
    >
      {iconLeft && iconLeft}
      <Text className="text-white text-md font-bold">{title}</Text>
      {iconRight && iconRight}
    </TouchableOpacity>
  );
};

export default CustomButton;
