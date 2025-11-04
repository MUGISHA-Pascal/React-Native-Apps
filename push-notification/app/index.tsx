import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import {
  registerForPushNotificationsAsync,
  schedulePushNotification,
} from "./services/NotificationService";

export default function App() {
  useEffect(() => {
    // Request permissions
    registerForPushNotificationsAsync();

    // Listener for notifications received while app is foreground
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification Received:", notification);
      }
    );

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Push Notification Practice</Text>
      <Button
        title="Send Test Notification"
        onPress={schedulePushNotification}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
});
