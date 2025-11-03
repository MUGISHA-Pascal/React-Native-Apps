import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SettingsScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Settings ⚙️</Text>
    <Text>Coming soon...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 20, fontWeight: "bold" },
});

export default SettingsScreen;
