import React from "react";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
// import PostsScreen from "./Screens/PostsScreen";
// import Example from "./Screens/Example";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const AuthStack = createStackNavigator();

const App = () => (
  // <>
  //   <Example />
  // </>

  <NavigationContainer>
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Registration"
        component={RegistrationScreen}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
    </AuthStack.Navigator>
  </NavigationContainer>
  // <PostsScreen />
);
export default App;
