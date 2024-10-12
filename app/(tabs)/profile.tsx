import { View, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '@/constants';
import EmptyState from '@/components/EmptyState';
import { getUserInfo, signOut } from '@/lib/appwrite';
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from '@/components/VideoCard';
import { useGlobalContext } from '@/context/GlobalProvider';
import InfoBox from "@/components/InfoBox.jsx";
import { router } from 'expo-router';

const Profile = () => {

    const { user, setUser, setIsLoggedIn } = useGlobalContext();
    // console.log(user.avatar);
    const { data: posts } = useAppwrite(() => getUserInfo(user.$id));

    const logout = async () => {
        await signOut();
        setUser(null);
        setIsLoggedIn(false);

        // your cant go back once you have logged out. We are not pushing it so that the mobile state knows where to go when back button is pressed
        // but in case of replace we have replaced the current link in stack with the provided value.
        router.replace("/(auth)/sign-in")
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                // data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    // <Text className="text-3xl text-white">{item.title}</Text>
                    <VideoCard video={item} />
                )}
                ListHeaderComponent={(item) => (
                    <View className="w-full justify-center  items-center mt-6 mb-12 px-4">
                        <TouchableOpacity
                            className="w-full items-end mb-10"
                            onPress={logout}
                        >
                            <Image
                                source={icons.logout}
                                resizeMode='contain'
                                className="w-6 h-6"
                            />
                        </TouchableOpacity>

                        <View className="w-16 h-16 border p-1 border-secondary-100 rounded-lg justify-center items-center">
                            <Image
                                className="w-full h-full rounded-lg"
                                source={{ uri: user?.avatar }}
                                resizeMode='contain'
                            />
                        </View>

                        <InfoBox
                            title={user?.username}
                            containerStyle="mt-5"
                            titleStyle="text-lg"
                        />

                        <View className="flex-row jusitfy-center items-center ">
                            <InfoBox
                                title={posts.length || 0}
                                subtitle="Posts"
                                containerStyle="mr-10"
                                titleStyle="text-xl"
                            />
                            <InfoBox
                                title="1.3K"
                                subtitle="Followers"
                                titleStyle="text-xl"
                            />

                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Videos Found"
                        subtitle="Be the first one to upload the Video"
                    />
                )}
            // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
            <StatusBar backgroundColor='#161622' style='light' />
        </SafeAreaView>
    )
}

export default Profile;