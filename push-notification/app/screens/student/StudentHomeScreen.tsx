// screens/student/StudentHomeScreen.tsx
import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { getHomeworks } from "../../services/api";

export default function StudentHomeScreen() {
  const [homeworks, setHomeworks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { signOut } = useContext(AuthContext);

  const loadHomeworks = async () => {
    try {
      setIsLoading(true);
      const data = await getHomeworks("dummy-token"); // In a real app, use the actual token
      setHomeworks(data);
    } catch (error) {
      console.error("Failed to load homeworks", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHomeworks();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Homeworks</Text>
        <Button title="Logout" onPress={signOut} />
      </View>

      <FlatList
        data={homeworks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.homeworkItem}>
            <Text style={styles.homeworkTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.dueDate}>
              Due: {new Date(item.dueDate).toLocaleDateString()}
            </Text>
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>
                Status: {item.isCompleted ? "Completed" : "Pending"}
              </Text>
            </View>
          </View>
        )}
        refreshing={isLoading}
        onRefresh={loadHomeworks}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  listContent: {
    paddingBottom: 20,
  },
  homeworkItem: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  homeworkTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 16,
  },
  dueDate: {
    marginTop: 4,
    color: "#666",
  },
  statusContainer: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  statusText: {
    color: "#2196F3",
    fontWeight: "500",
  },
});
