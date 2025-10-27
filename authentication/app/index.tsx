import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: { username: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Page = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default Page;
