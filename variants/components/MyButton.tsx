import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

type ButtonVariant = "primary" | "secondary" | "danger";

interface MyButtonProps {
  title: string;
  variant: ButtonVariant;
  onPress: (event: GestureResponderEvent) => void;
}

export const MyButton: React.FC<MyButtonProps> = ({
  title,
  variant = "primary",
  onPress,
}) => {
  const backgroundColor = (() => {
    switch (variant) {
      case "primary":
        return "#3498db";
      case "secondary":
        return "#95a5a6";
      case "danger":
        return "#e74c3c";
      default:
        return "#3498db";
    }
  })();
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 5,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
