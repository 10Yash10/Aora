import React, { useState } from 'react'
import { Text, TextInput, Image, TouchableOpacity, View } from 'react-native'
import { icons } from '@/constants';

const FormField = ({ title, value, handleChangeText, placeholder, otherStyles, keyboardType, ...props }: {
    title: String,
    value: String,
    handleChangeText: () => {},
    otherStyles: String,
    keyboardType: String,
}) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
            <View className="flex-row w-full h-16 px-4 rounded-2xl border border-black-200 focus:border-secondary items-center bg-black-100">
                <TextInput
                    className="flex-1 text-white font-psemibold text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                />

                {title === 'Password' && (
                    <TouchableOpacity
                        resizeMode="contain"

                        onPress={() =>
                            setShowPassword(!showPassword)}>
                        <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default FormField