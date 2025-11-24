// screens/teacher/TeacherHomeScreen.tsx
import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { createHomework, getHomeworks } from "../../services/api";

export default function TeacherHomeScreen() {
  const [homeworks, setHomeworks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
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

  const handleCreateHomework = async () => {
    if (!title || !description || !dueDate) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await createHomework("dummy-token", title, description, dueDate); // Use actual token
      setTitle("");
      setDescription("");
      setDueDate("");
      await loadHomeworks();
    } catch (error) {
      console.error("Failed to create homework", error);
      alert("Failed to create homework");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Teacher Dashboard</Text>
        <Button title="Logout" onPress={signOut} />
      </View>

      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Create New Homework</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />
        <TextInput
          style={styles.input}
          placeholder="Due Date (YYYY-MM-DD)"
          value={dueDate}
          onChangeText={setDueDate}
        />
        <Button
          title="Assign Homework"
          onPress={handleCreateHomework}
          disabled={isLoading}
        />
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Assigned Homeworks</Text>
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
            </View>
          )}
          refreshing={isLoading}
          onRefresh={loadHomeworks}
        />
      </View>
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
  form: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 12,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  listContainer: {
    flex: 1,
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
    marginTop: 8,
    color: "#666",
    fontStyle: "italic",
  },
});
