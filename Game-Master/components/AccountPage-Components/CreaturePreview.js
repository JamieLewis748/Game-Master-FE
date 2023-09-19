import { SafeAreaView, StyleSheet, FlatList, Image } from "react-native";

const CreaturePreview = () => {
  const IMAGES = [
    {
      id: "1",
      uri: `https://img.itch.zone/aW1nLzEzMzIzMzkzLmdpZg==/original/A7JFLC.gif`,
    },
    {
      id: "2",
      uri: `https://img.itch.zone/aW1nLzEzMzIzNDA0LmdpZg==/original/QUoq1B.gif`,
    },
    {
      id: "3",
      uri: `https://img.itch.zone/aW1nLzEzMzIzMzc4LmdpZg==/original/SjP5Aq.gif`,
    },
  ];

  const renderItem = ({ item }) => (
    <Image source={{ uri: item.uri }} style={styles.image} />
  );

  return (
    <FlatList
      data={IMAGES}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
    height: 40,
    resizeMode: "contain",
  },
});

export default CreaturePreview;
