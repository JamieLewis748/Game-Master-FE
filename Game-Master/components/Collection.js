import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { useState } from "react";

const Collection = () => {
  const [selectedImage, setSelectedImage] = useState("");

  const IMAGES = [
    {
      id: "1",
      uri: `https://img.itch.zone/aW1nLzEzMzIzMzkzLmdpZg==/original/A7JFLC.gif`,
      name: "dinosaur thing",
      date_collected: "11.11.01",
      location: "Local Gameshop",
      game: "Twister",
    },
    {
      id: "2",
      uri: `https://img.itch.zone/aW1nLzEzMzIzNDA0LmdpZg==/original/QUoq1B.gif`,
      name: "Green-haired elf lady",
      date_collected: "1.4.01",
      location: "Pub",
      game: "Darts",
    },
    {
      id: "3",
      uri: `https://img.itch.zone/aW1nLzEzMzIzMzc4LmdpZg==/original/SjP5Aq.gif`,
      name: "Gargoyle",
      date_collected: "4.12.02",
      location: "Halloween Event",
      game: "Monopoly",
    },

    {
      id: "4",
      uri: `https://img.itch.zone/aW1nLzEzMzIzMzk2LmdpZg==/original/KF%2FOv5.gif`,
      name: "turtle",
      date_collected: "11.4.01",
      location: "Library",
      game: "Chess",
    },
    {
      id: "5",
      uri: `https://img.itch.zone/aW1nLzEzMzIzMzg0LmdpZg==/original/AirNMy.gif`,
      name: "No idea what this is",
      date_collected: "1.2.09",
      location: "Some Competition",
      game: "D&D",
    },
    {
      id: "6",
      uri: `https://img.itch.zone/aW1nLzEzMzIzMzk4LmdpZg==/original/A78CD3.gif`,
      name: "Bug lady",
      date_collected: "4.12.02",
      location: "Game night",
      game: "Scrabble",
    },
  ];
  return (
    <View style={styles.container}>
      {IMAGES.map((image) => (
        <Pressable key={image.id} onPress={() => setSelectedImage(image)}>
          <Image source={{ uri: image.uri }} style={styles.image} />
        </Pressable>
      ))}

      {selectedImage && (
        <View style={styles.selectedImageView}>
          <Image
            source={{ uri: selectedImage.uri }}
            style={styles.selectedImage}
          />
          <View style={styles.info}>
            <Text>{selectedImage.name}</Text>
            <Text>{selectedImage.date_collected}</Text>
            <Text>{selectedImage.location}</Text>
            <Text>{selectedImage.game}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    margin: 10,
    height: 100,
    width: Dimensions.get("window").width / 4 - 20,
    resizeMode: "contain",
  },

  selectedImageView: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },

  selectedImage: {
    width: 150,
    height: 150,
  },

  info: {
    padding: 10,
    marginLeft: 10,
    height: 100,
    width: 150,
  },
});

export default Collection;
