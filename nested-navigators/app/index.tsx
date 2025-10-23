import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";

type RootStackParamList = {
  HomeTabs: undefined;
  Details: { itemId: number };
};

type HomeStackParamList = {
  feed: undefined;
  profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createNativeStackNavigator<HomeStackParamList>();

// ------nested tabs--------

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="feed" component={FeedScreen} />
      <Tab.Screen name="profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// -----screens-------
function FeedScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Feed Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details", { itemId: 42 })}
      />
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("profile")}
      />
    </View>
  );
}

function ProfileScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details", { itemId: 99 })}
      />
    </View>
  );
}

function DetailsScreen({ route }: any) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Details Screen</Text>
      <Text>Item ID: {route.params.itemId}</Text>
    </View>
  );
}

// ------app-------
export default function Page() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{ headerShown: true }}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
