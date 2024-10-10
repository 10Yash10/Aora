import React, { useState } from "react";
import { Text, TextInput, Image, TouchableOpacity, View } from "react-native";
import { icons } from "@/constants";

const SearchInput = ({
  title,
  value,
  handleChangeText,
  placeholder,
  otherStyles,
  keyboardType,
  ...props
}: {
  title: String,
  value: String,
  handleChangeText: () => {},
  otherStyles: String,
  keyboardType: String,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (

    <View className="flex-row w-full h-16 px-4 rounded-2xl border border-black-200 focus:border-secondary items-center bg-black-200 space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={value}
        placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
      />

      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
