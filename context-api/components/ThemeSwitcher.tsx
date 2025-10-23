import { useTheme } from "@/app/context/ThemeContext";
import { Button, Text, View, StyleSheet } from "react-native";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "light" ? "#fff" : "#333" },
      ]}
    >
      <Text
        style={{ color: theme === "light" ? "#000" : "#fff", fontSize: 20 }}
      >
        Current Theme : {theme.toUpperCase()}
      </Text>
      <Button
        title={`Switch to ${theme === "light" ? "dark" : "light"} Mode`}
        onPress={toggleTheme}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
