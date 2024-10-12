import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { icons } from '@/constants'
import { Video, ResizeMode } from "expo-av";

const VideoCard = ({ video: { title, thumbnail, video, creator: { username, avatar } } }: Object) => {

    const [play, setPlay] = useState(false);
    const videoRef = useRef(null);

    return (
        <View className="flex-col items-center px-4 mb-14">
            <View className="flex-row gap-3 items-start">

                {/* HEADER */}
                <View className="justify-center flex-row items-center flex flex-1">

                    {/* logo */}
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                        <Image source={{ uri: avatar }} className="w-full h-full rounded-lg" resizeMode="cover" />
                    </View>

                    {/* title */}
                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className="text-white font-psemibold text-sm" numberOfLines={1}>{title}</Text>
                        <Text className="text-gray-100 text-xs font-pregular" numberOfLines={1}>{username}</Text>
                    </View>

                </View>

                <View className="pt-2">
                    <Image source={icons.menu} className="w-5 h-5" resizeMode='contain' />
                </View>

            </View>
            {play ?
                (
                    <Video
                        ref={videoRef}
                        // autoPlay
                        // source={{ uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" }}
                        source={{ uri: video }}
                        // the video stored in appwrite database is no supported. 
                        className="w-full h-60 rounded-xl mt-3"
                        // style={{ width: "52px", height: "72?", marginTop: 3, backgroundColor: "white" }}
                        resizeMode={ResizeMode.CONTAIN}
                        shouldPlay={true}
                        isLooping
                        useNativeControls={true}
                        onPlaybackStatusUpdate={(status) => {
                            if (status.didJustFinish) {
                                setPlay(false);
                            }
                        }}
                        onError={(error) => console.log("Error in Video Playback:", error)}
                    />
                    // <Text>Playing</Text>
                ) : (
                    <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={() => setPlay(true)}
                        className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
                    >
                        <Image
                            source={{ uri: thumbnail }}
                            className="w-full h-full mt-3"
                            resizeMode='contain'
                        />

                        <Image
                            source={icons.play}
                            className="w-12 h-12 absolute"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
        </View>
    )
}

export default VideoCard;