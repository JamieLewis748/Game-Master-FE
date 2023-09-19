import react from "react";
import { Paragraph, IconButton } from "react-native-paper";
import { View } from "react-native";
const PublicInfo = ({ isPublic }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <IconButton icon="account-off" size={16} color="gray" />
      <Paragraph>
        <Paragraph style={{ fontWeight: "bold" }}>Public: </Paragraph>{" "}
        {isPublic ? "Public Event" : "Private Event"}
      </Paragraph>
    </View>
  );
};

export default PublicInfo;