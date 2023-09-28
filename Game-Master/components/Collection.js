import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, ScrollView, Modal, TouchableOpacity } from "react-native";
import axios from "axios";
import FlipCard from "react-native-flip-card";

const localImages = [
  require("../CollectionAssets/Biteme.png"),
  require("../CollectionAssets/water.png"),
  require("../CollectionAssets/flame-boy.webp"),
  require("../CollectionAssets/wind-lineart.webp"),
];

const pastelColors = [
  "#F7B385", // Peach
  "#BEC8D8", // 
  "#FFA07A", // LightSalmon
  "#C4E5C9", // Pistachio
  "#EFF57C", // Pastel Yellow
  "#FCF1F2", // 
  "#C8C3F8", // Lavander
];
const axiosBase = axios.create({
  baseURL: "https://game-master-be.onrender.com/api/",
});

const fetchedCollections = () => axiosBase.get("collections");

const PopupMessage = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Tap on the Creature</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const CollectionsList = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [collectionData, setCollectionData] = useState([]);
  const [showPopup, setShowPopup] = useState(true); // Initially, show the pop-up

  useEffect(() => {
    fetchedCollections().then(({ data }) => {
      setCollectionData(data);
    });
  }, []);

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * pastelColors.length);
    return pastelColors[randomIndex];
  };



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Collections</Text>
      <View style={styles.gridContainer}>
        {collectionData.map((item, index) => (
          <View style={styles.gridItem} key={item._id}>
            <FlipCard
              friction={15}
              perspective={200}
              flipHorizontal={true}
              flipVertical={false}
              flip={false}
              clickable={true}
              onPress={() => setSelectedImage(item)}
            >
              {/* Front Card */}
              <View style={[styles.cardFront]}>
                <Image
                  source={localImages[index]}
                  style={styles.image}
                  onError={(error) => console.log("Image failed to load. Error:", error)}
                />
                <Text style={styles.cardFrontText}>{item.name}</Text>
              </View>

              {/* Back Card */}
              <View style={[
                styles.cardBack,
                { backgroundColor: getRandomColor() }
              ]}>
                {(item.name === 'fire')?<Text style={styles.cardBackText}>A powerful {item.name} creature, burning with competative desire</Text>:<></>}
                {(item.name === 'grass')?<Text style={styles.cardBackText}>An ancient {item.name} creature, contains all the wisdom of the forest</Text>:<></>}
                {(item.name === 'wind')?<Text style={styles.cardBackText}>A mighty {item.name} entity, strikes fear into opponents</Text>:<></>}
                {(item.name === 'water')?<Text style={styles.cardBackText}>Lucky {item.name} being, able to flow with changing fortune</Text>:<></>}
                
              </View>
            </FlipCard>
          </View>
        ))}
      </View>

      {selectedImage && (
        <View style={styles.selectedImageView}>
          <Image source={{ uri: selectedImage.img_url }} style={styles.selectedImage} />
          <Text>{selectedImage.name}</Text>
        </View>
      )}

      <PopupMessage
        visible={showPopup}
        onClose={() => setShowPopup(false)} // Close the pop-up when the user taps "Close"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "rgb(190,190,190)",
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'transparent',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 30,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  gridItem: {
    width: 150,
    marginBottom: 30,
  },
  cardFront: {
    backgroundColor: "rgb(37,35,42)",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.50,
    shadowRadius: 3.84,
  },
  cardFrontText: {
    fontWeight: 'bold',
    color: 'white',
  },

  cardBack: {
    backgroundColor: "rgb(134,160,177)",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.50,
    shadowRadius: 3.84,
  },
  cardBackText: {
    textAlign: 'center',
    color: 'black',
  },
  image: {
    margin: 5,
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
  selectedImageView: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  selectedImage: {
    width: 200,
    height: 200,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
  },
});

export default CollectionsList;
