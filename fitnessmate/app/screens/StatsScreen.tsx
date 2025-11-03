import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StatsScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Your Stats 📊</Text>
    <Text>Workouts completed: 5</Text>
    <Text>Calories burned: 1200</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 20, fontWeight: "bold" },
});

export default StatsScreen;
