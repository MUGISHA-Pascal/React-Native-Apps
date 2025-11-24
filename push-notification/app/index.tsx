// App.tsx
import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./context/AuthContext";
import NotificationService from "./services/NotificationService";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { View } from "react-native";
import TeacherHomeScreen from "./screens/teacher/TeacherHomeScreen";
import StudentHomeScreen from "./screens/student/StudentHomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

const Stack = createStackNavigator();

export default function App() {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  const authContext = {
    signIn: async (data: any) => {
      setUserToken("dummy-auth-token");
      setUserInfo(data.user);
    },
    signOut: () => {
      setUserToken(null);
      setUserInfo(null);
    },
    signUp: () => {
      // In a real app, you would handle sign up here
    },
  };

  useEffect(() => {
    // Register for push notifications
    if (userToken && userInfo) {
      NotificationService.registerForPushNotifications(userToken);
    }

    // Handle notifications received while the app is in the foreground
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // Handle the notification
        console.log("Notification received:", notification);
      });

    // Handle user tapping on a notification
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification tapped:", response);
      });

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, [userToken, userInfo]);

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator>
        {userToken ? (
          userInfo?.role === "teacher" ? (
            <Stack.Screen name="TeacherHome" component={TeacherHomeScreen} />
          ) : (
            <Stack.Screen name="StudentHome" component={StudentHomeScreen} />
          )
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}
