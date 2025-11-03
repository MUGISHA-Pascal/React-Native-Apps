import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { WorkoutContext } from "../context/WorkoutContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../navigation/StackNavigator";
import { useNavigation } from "@react-navigation/native";

type WorkoutListNavProp = StackNavigationProp<StackParamList, "Workout List">;

const WorkoutListScreen: React.FC = () => {
  const context = useContext(WorkoutContext);
  const navigation = useNavigation<WorkoutListNavProp>();

  if (!context) return null;
  const { workouts } = context;

  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate("Workout Detail", { workout: item })
            }
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  name: { fontWeight: "bold" },
});

export default WorkoutListScreen;
