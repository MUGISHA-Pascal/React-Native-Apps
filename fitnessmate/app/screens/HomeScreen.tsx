import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HomeScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome to FitnessMate 🏋️‍♀️</Text>
    <Text>Track your workouts and stay fit!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold" },
});

export default HomeScreen;
