import { icons } from '@/constants'
import React from 'react'
import { useState } from 'react'
import { Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Video, ResizeMode } from "expo-av";

const zoomIn = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1
    }
}

const zoomOut = {
    0: {
        scale: 1.1
    },
    1: {
        scale: 0.9
    }
}

const TrendingItem = ({ activeItem, item }: any) => {

    const [play, setPlay] = useState(false);
    const videoRef = React.useRef(null);
    // console.log("Video ---------------------------------- \n", item.video);

    return (
        <Animatable.View
            className="mr-5"
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={500}
        >
            {
                play ? (
                    <Video
                        ref={videoRef}
                        // autoPlay
                        source={{ uri: item.video }}
                        className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
                        // style={{ width: "52px", height: "72?", marginTop: 3, backgroundColor: "white" }}
                        resizeMode={ResizeMode.COVER}
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
                ) : (
                    <TouchableOpacity
                        className="relative justify-center items-center"
                        activeOpacity={0.7}
                        onPress={() => setPlay(true)}
                    >
                        <ImageBackground
                            source={{ uri: item.thumbnail }}
                            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
                            resizeMethod='cover'
                        />

                        <Image
                            source={icons.play}
                            className="w-12 h-12 absolute"
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                )
            }
        </Animatable.View>
    )
}

const Trending = ({ posts }: {
    posts: []
}) => {

    const viewableItemChanged = ({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key);
        }
    }
    const [activeItem, setActiveItem] = useState(posts[0]?.$id);
    const viewConfigRef = React.useRef({ itemVisiblePercentThreshold: 70 })

    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <TrendingItem activeItem={activeItem} item={item} />
            )}
            horizontal
            onViewableItemsChanged={viewableItemChanged}
            viewabilityConfig={viewConfigRef.current}
            contentOffset={{ x: 170 }}
            ListEmptyComponent={() => {
                <Text>Empty</Text>
            }}
        />
    )
}

export default Trending;