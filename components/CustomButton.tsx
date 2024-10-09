import React from "react";
import { Text, TouchableOpacity } from "react-native";

function CustomButton({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: {
  title: String,
  handlePress: () => {},
  containerStyles: String,
  textStyles: String,
  isLoading: boolean,
}) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-2xl justify-center items-center min-h-[62px] ${containerStyles} ${isLoading ? "opacity-50" : ""
        }`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles} `}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default CustomButton;
