import React, { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider } from "react-redux";

import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import Home from "./screens/auth/Home";

import { store } from "./redux/store";

import { auth } from "./firebase/config";

const AuthStack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  auth.onAuthStateChanged((user) => setUser(user));

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthStack.Navigator initialRouteName="Login">
          {!user ? (
            <>
              <AuthStack.Screen
                options={{ headerShown: false }}
                name="Login"
                component={LoginScreen}
              />

              <AuthStack.Screen
                options={{ headerShown: false }}
                name="Registration"
                component={RegistrationScreen}
              />
            </>
          ) : (
            <AuthStack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
          )}
        </AuthStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
