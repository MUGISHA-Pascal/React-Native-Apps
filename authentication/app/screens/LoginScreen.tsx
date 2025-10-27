import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "..";
import { loginUser } from "../services/userService";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const user = await loginUser(username, password);
    if (user) {
      navigation.navigate("Home", { username });
    } else {
      Alert.alert("Error", "Invalid username or password");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, textAlign: "center" }}>Login</Text>
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
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Go to Signup"
        onPress={() => navigation.navigate("Signup")}
      />
    </View>
  );
};

export default LoginScreen;
