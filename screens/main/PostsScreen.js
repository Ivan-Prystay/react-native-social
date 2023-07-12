import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultPostsScreen from "../nestedScreen/DefaultPostsScreen";
import CommentsScreen from "../nestedScreen/CommentsScreen";
import MapScreen from "../nestedScreen/MapScreen";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Post"
        component={DefaultPostsScreen}
        options={{
          headerShown: false,
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        options={{ headerTitleAlign: "center" }}
        component={CommentsScreen}
      />
      <NestedScreen.Screen
        name="Map"
        options={{ headerTitleAlign: "center" }}
        component={MapScreen}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
