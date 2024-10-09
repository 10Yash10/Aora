import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from "expo-router";
import { icons } from "../../constants/"

const TabsLayout = () => {

    const TabIcon = ({ icon, color, name, focused }: {
        icon: any,
        color: any,
        name: String,
        focused: Boolean
    }) => {
        return (
            <View className="items-center justify-center gap-1">
                < Image
                    source={icon}
                    resizeMode='contain'
                    tintColor={color}
                    className="w-6 h-6 "
                />
                <Text className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`} style={{ color: color }}>
                    {name}
                </Text>
            </View >
        )
    }

    return (
        <>
            <Tabs screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#FFA001",
                tabBarInactiveTintColor: "#CDCDE0",
                tabBarStyle: {
                    backgroundColor: "#161622",
                    borderTopWidth: 1,
                    borderTopColor: '#232533',
                    // height: 84,
                }
            }}>
                {/* Home Bottom Bar */}
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                // icon={require("../../assets/icons/home.png")}
                                icon={icons.home}
                                color={color}
                                name="Home"
                                focused={focused}
                            />
                        )
                    }}
                />

                {/* Bookmark Bottom Bar */}
                <Tabs.Screen
                    name="bookmark"
                    options={{
                        title: "Bookmark",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                // icon={require("../../assets/icons/home.png")}
                                icon={icons.bookmark}
                                color={color}
                                name="Bookmark"
                                focused={focused}
                            />
                        )
                    }}
                />

                {/* Create Bottom Bar */}
                <Tabs.Screen
                    name="create"
                    options={{
                        title: "Create",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                // icon={require("../../assets/icons/home.png")}
                                icon={icons.plus}
                                color={color}
                                name="Create"
                                focused={focused}
                            />
                        )
                    }}
                />

                {/* Profile Bottom Bar */}
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                // icon={require("../../assets/icons/home.png")}
                                icon={icons.profile}
                                color={color}
                                name="Profile"
                                focused={focused}
                            />
                        )
                    }}
                />
            </Tabs>
        </>
    )
}

export default TabsLayout