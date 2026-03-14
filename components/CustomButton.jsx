import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

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

const getShadowColor = (variant) => {
  switch (variant) {
    case "danger":
      return "#ef4444";
    case "success":
      return "#22c55e";
    case "outline":
      return "#000";
    default:
      return "#0286ff";
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
  disabled = false,
  loading = false,
}) => {
  return (
    <TouchableOpacity
      onPress={disabled || loading ? null : onPress}
      onPressIn={disabled || loading ? null : onPressIn}
      activeOpacity={disabled || loading ? 1 : 0.8}
      className={`w-full  rounded-full py-4 px-6 flex flex-row justify-center items-center ${getBgVariantStyle(bgVariant)} ${className}`}
      style={{
        shadowColor: disabled ? "transparent" : getShadowColor(bgVariant),
        shadowOffset: { width: 0, height: disabled ? 0 : 4 },
        shadowOpacity: disabled ? 0 : 0.25,
        shadowRadius: disabled ? 0 : 10,
        elevation: disabled ? 0 : 5,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {loading ? (
        <ActivityIndicator
          color={textVariant === "primary" ? "#000" : "#fff"}
          size="small"
          style={{ marginRight: title ? 8 : 0 }}
        />
      ) : (
        iconLeft && iconLeft
      )}
      <Text
        className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}
        style={{ fontFamily: "Jakarta-Bold" }}
      >
        {loading ? "Please wait..." : title}
      </Text>
      {!loading && iconRight && iconRight}
    </TouchableOpacity>
  );
};

export default CustomButton;
