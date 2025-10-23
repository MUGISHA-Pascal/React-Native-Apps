import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "..";
import { Text, View } from "react-native";

type DetailsScreenNavigationProp = RouteProp<RootStackParamList, "Details">;
type Props = {
  route: DetailsScreenNavigationProp;
};
const DetailsScreen: React.FC<Props> = ({ route }) => {
  const { name, age } = route.params;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Details Screen</Text>
      <Text>Name : {name}</Text>
      <Text>Age : {age}</Text>
    </View>
  );
};
export default DetailsScreen;
