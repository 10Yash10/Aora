import { Image, ScrollView, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton"
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function Index() {

  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />

  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full  items-center h-full px-4 ">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px] "
            resizeMode="contain"
          />

          <View className="relative mt-1">
            <Text className="text-3xl text-white font-bold text-center">Discover Endless Possibilites with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[116px] h-[15px] bottom-1.5 -right-56"
              resizeMode="contain"
            />

          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-4 text-center">Where creativity meets innovation: embark on a journey of limitless exploration with Aora</Text>
          <CustomButton title="Let's Login" handlePress={async () => router.push('/(auth)/sign-in')} containerStyles="w-full mt-7" textStyles={""} isLoading={false} />
          {/* <CustomButton title="Go to" handlePress={() => { <Redirect href="/(auth)sign-in" /> }} containerStyles="w-full mt-7" /> */}
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
