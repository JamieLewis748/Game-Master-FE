import react from "react";
import { Paragraph, IconButton } from "react-native-paper";
import { View } from "react-native";

const DescriptionInfo = ({ gameInfo }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <IconButton icon="book-open-variant" size={16} color="gray" />
      <Paragraph>
        <Paragraph style={{ fontWeight: "bold" }}>Description: </Paragraph>
        {gameInfo}
      </Paragraph>
    </View>
  );
};

export default DescriptionInfo;
