import React from "react";
import { View, Text, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "..";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation, route }) => {
  const { username } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome, {username} 🎉</Text>
      <Button title="Logout" onPress={() => navigation.navigate("Login")} />
    </View>
  );
};

export default HomeScreen;
