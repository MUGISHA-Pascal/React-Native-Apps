import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { registerUser } from "../services/userService";
import { RootStackParamList } from "..";

type Props = NativeStackScreenProps<RootStackParamList, "Signup">;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const success = await registerUser(username, password);
    if (success) {
      Alert.alert("Success", "Account created! You can now login.");
      navigation.navigate("Login");
    } else {
      Alert.alert("Error", "Username already exists.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, textAlign: "center" }}>Signup</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title="Create Account" onPress={handleSignup} />
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

export default SignupScreen;
