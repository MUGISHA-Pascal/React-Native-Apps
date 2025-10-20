// App.tsx
import * as React from 'react';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

// Define the navigation routes
type RootStackParamList = {
  Login: undefined;
  Dashboard: { username: string } | undefined;
};

// Define screen props
type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
type DashboardProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

// Login Screen
function LoginScreen({ navigation }: LoginProps) {
  const [username, setUsername] = React.useState('');

  const handleLogin = () => {
    if (username.trim()) {
      navigation.navigate('Dashboard', { username });
    } else {
      alert('Please enter your username');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

// Dashboard Screen
function DashboardScreen({ route, navigation }: DashboardProps) {
  const username = route.params?.username ?? 'Guest';
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {username}!</Text>
      <Text style={styles.subtitle}>This is your dashboard</Text>
      <Button title="Logout" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

// Main App
export default function App() {
  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 22,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
});
