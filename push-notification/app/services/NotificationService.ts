// services/NotificationService.ts
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

// Configure notifications to show alerts while app is in foreground
const configureNotifications = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
};

// Only configure notifications if we're not in Expo Go
if (Constants.appOwnership !== "expo") {
  configureNotifications();
}

const NotificationService = {
  registerForPushNotifications: async (token: string) => {
    // Skip in Expo Go
    if (Constants.appOwnership === "expo") {
      console.warn(
        "Push notifications not supported in Expo Go. Use a development build."
      );
      return null;
    }

    let tokenResult;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        console.warn("Failed to get push token for push notification!");
        return null;
      }

      tokenResult = await Notifications.getExpoPushTokenAsync();
      // In a real app, you would send this token to your backend
      console.log("Expo push token:", tokenResult.data);
    } else {
      console.warn("Must use physical device for Push Notifications");
    }

    return tokenResult;
  },

  // Add other notification related methods here
};

export default NotificationService;
