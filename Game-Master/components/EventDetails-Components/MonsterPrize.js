import React from "react";
import { View, Image, Text } from "react-native";

const getImageByType = (imageType) => {
  switch (imageType) {
    case "00000020f61bb4362eee2c03":
      return require("../../CollectionAssets/flame-boy.webp");
    case "00000020f61bb4362eee2c01":
      return require("../../CollectionAssets/Biteme.png");
    case "00000020f61bb4362eee2c02":
      return require("../../CollectionAssets/water.png");
    case "00000020f61bb4362eee2c04":
      return require("../../CollectionAssets/wind-lineart.webp");
    default:
      return null;
  }
};

const MonsterPrize = ({ collectionId }) => {
  const imageType = collectionId;

  return (
    <View style={{ marginTop: 20 }}>
      <Image
        source={getImageByType(imageType)}
        style={{
          width: 90,
          height: 120,
          display: "flex",
          justifyContent: "center",
          marginTop: 40,
          marginRight: "auto",
          marginLeft: "auto",
          resizeMode: "contain",
          borderWidth: 3,
          borderBlockColor: "purple",
          borderRadius: 10,
        }}
      />
      <Text
        style={{
          color: "white",
          display: "flex",
          justifyContent: "center",
          fontSize: 16,
          fontWeight: 500,
          marginBottom: 30,
        }}
      >
        Prize for winner
      </Text>
    </View>
  );
};

export default MonsterPrize;
