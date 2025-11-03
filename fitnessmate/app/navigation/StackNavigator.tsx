// navigation/StackNavigator.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WorkoutListScreen from "../screens/WorkoutListScreen";
import WorkoutDetailScreen from "../screens/WorkoutDetailScreen";
import { Workout } from "../context/WorkoutContext";

export type StackParamList = {
  "Workout List": undefined;
  "Workout Detail": { workout: Workout };
};

const Stack = createStackNavigator<StackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Workout List" component={WorkoutListScreen} />
      <Stack.Screen name="Workout Detail" component={WorkoutDetailScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
