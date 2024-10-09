import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../../constants";
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { login } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';


const signIn = () => {

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setUser, setIsLoggedIn } = useGlobalContext();

    const submit = async () => {

        if (!form.email || !form.password) {
            Alert.alert("Error", "Please fill all the fields");
        }
        setIsSubmitting(true);

        try {
            const result = await login(form.email, form.password);
            setUser(result);
            setIsLoggedIn(true);
            router.replace('/home');
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setIsSubmitting(false);
        }
        setForm({
            email: "",
            password: "",
        })
    }


    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center h-full px-4 my-6">
                    <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px] justify-center" />
                    <Text className='text-2xl text-white text-semibold mt-10 font-psemibold text-center'>Log in to Aora</Text>

                    {/* form field for email field */}
                    <FormField
                        title="Email"
                        placeholder=""
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                    />

                    {/* form field for passwords field */}
                    <FormField
                        title="Password"
                        placeholder=""
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles="mt-7 mb-7"
                    />

                    {/* button for submitting the form */}
                    <CustomButton
                        title="login"
                        handlePress={submit}
                        isLoading={isSubmitting}
                    />

                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text>
                        <Link className="text-lg font-psemibold text-secondary" href="/(auth)/sign-up">Sign Up</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default signIn