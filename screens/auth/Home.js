import React from "react";
import { Ionicons } from "@expo/vector-icons";

import Svg, { Rect, Path } from "react-native-svg";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from "../main/PostsScreen";
import CreatePostsScreen from "../main/CreatePostsScreen";
import ProfileScreen from "../main/ProfileScreen";

const MainTab = createBottomTabNavigator();

export default function Home({ navigation }) {
  return (
    <MainTab.Navigator initialRouteName="Posts">
      <MainTab.Screen
        options={{
          tabBarShowLabel: false,
          headerShown: false, // Приховав всі батьківські заголовки
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name="md-grid-outline"
              size={size}
              color={focused ? "#FF6C00" : color}
            />
          ),

          headerRight: () => <ButtonOut />,
          headerTitleAlign: "center",
        }}
        name="Posts"
        component={PostsScreen}
      />

      <MainTab.Screen
        options={{
          headerTitleAlign: "center",
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused, size, color }) => (
            <Svg
              width="70"
              height="40"
              viewBox="0 0 70 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Rect width="70" height="40" rx="20" fill="#FF6C00" />
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M35.5 13.5H34.5V19.5H28.5V20.5H34.5V26.5H35.5V20.5H41.5V19.5H35.5V13.5Z"
                fill="white"
              />
            </Svg>
          ),
        }}
        name="Create Post"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name="person-outline"
              size={size}
              color={focused ? "#FF6C00" : color}
            />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
}
