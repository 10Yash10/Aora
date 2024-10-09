import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

const home = () => {
    return (
        <View>
            <Text>home</Text>
            <StatusBar backgroundColor='#161622' style='light' />
        </View>
    )
}

export default home