import { MyButton } from "@/components/MyButton";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <MyButton
        title="Primary Button"
        variant="primary"
        onPress={() => console.log("Primary")}
      />
      <MyButton
        title="Secondary Button"
        variant="secondary"
        onPress={() => console.log("Secondary")}
      />
      <MyButton
        title="Danger Button"
        variant="danger"
        onPress={() => console.log("Danger")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
