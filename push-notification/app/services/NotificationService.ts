import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

// Configure notifications to show alerts while app is foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true, // Controls if notification shows as a banner
    shouldShowList: true, // Controls if notification shows in notification center
  }),
});

export const registerForPushNotificationsAsync = async (): Promise<
  string | undefined
> => {
  // Handle web platform
  if (Platform.OS === "web") {
    // Check if browser supports notifications
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications");
      return;
    }

    // Request permission
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Permission for notifications was denied");
      return;
    }

    console.log("Web push notifications are ready");
    return "web-push-token";
  }

  // Handle mobile platforms
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }

  // Get the token that uniquely identifies this device
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log("Push Token:", token);
  return token;
};

export const schedulePushNotification = async () => {
  // Skip notification scheduling on web as it's not supported
  if (Platform.OS === "web") {
    console.log("Push notifications are not supported on web");
    return;
  }

  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hello from PushNotifPractice! 🎉",
        body: "This is a test notification!",
        sound: true,
      },
      trigger: { seconds: 5, type: "timeInterval" as const },
    });
  } catch (error) {
    console.error("Error scheduling notification:", error);
  }
};
