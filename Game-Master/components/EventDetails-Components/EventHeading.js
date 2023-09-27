import react from "react";
import { Text, IconButton } from "react-native-paper";
import { View } from "react-native";

const EventHeading = ({ gameInfo }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
      <IconButton icon="book-open-variant" size={24} color="gray" />
      <Text style={{fontSize: 24, fontWeight: 600}}>
        {gameInfo}
      </Text>
    </View>
  );
};

export default EventHeading;
