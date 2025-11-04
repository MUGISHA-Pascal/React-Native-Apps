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

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log("Push Token:", token);
  return token;
};

export const schedulePushNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hello from PushNotifPractice! 🎉",
      body: "This is a test notification!",
      sound: true,
    },
    trigger: { seconds: 5, type: "timeInterval" as const },
  });
};
