import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackParamList } from "../navigation/StackNavigator";

type WorkoutDetailRoute = RouteProp<StackParamList, "Workout Detail">;

interface Props {
  route: WorkoutDetailRoute;
}

const WorkoutDetailScreen: React.FC<Props> = ({ route }) => {
  const { workout } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workout.name}</Text>
      <Text>{workout.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});

export default WorkoutDetailScreen;
