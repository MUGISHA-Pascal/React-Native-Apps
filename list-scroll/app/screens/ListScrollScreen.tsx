import {
  FlatList,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";

const flatListData = Array.from({ length: 20 }, (_, i) => `item ${i + 1}`);
const sectionListData = [
  {
    title: "Fruits",
    data: ["Apple", "Banana", "Orange", "Mango"],
  },
  {
    title: "Vegetables",
    data: ["Carrot", "Broccoli", "Spinach", "Potato"],
  },
];

const ListScrollScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* simple scrollview */}
      <Text style={styles.header}>ScrollView Example</Text>
      <ScrollView horizontal style={styles.scrollView}>
        {flatListData.map((item) => (
          <View key={item} style={styles.scrollItem}>
            <Text>{item}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Flatlist */}
      <Text style={styles.header}>FlatList Example</Text>
      <FlatList
        style={{ height: 300 }}
        data={flatListData}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item}</Text>
          </View>
        )}
      />

      {/* section list */}
      <Text style={styles.header}>SectionList Example</Text>
      <SectionList
        style={{ height: 300 }}
        sections={sectionListData}
        keyExtractor={(item: string, index: number) => item + index}
        renderItem={({ item }: { item: string }) => (
          <View style={styles.listItem}>
            <Text>{item}</Text>
          </View>
        )}
        renderSectionHeader={({
          section: { title },
        }: {
          section: { title: string };
        }) => <Text style={styles.sectionHeader}>{title}</Text>}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  scrollView: { marginVertical: 10 },
  scrollItem: {
    padding: 20,
    marginRight: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  listItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#ccc",
    padding: 5,
    marginTop: 10,
  },
});
export default ListScrollScreen;
