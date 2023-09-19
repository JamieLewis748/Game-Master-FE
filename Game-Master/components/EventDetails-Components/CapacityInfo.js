import react from "react";
import { Paragraph, IconButton } from "react-native-paper";
import { View } from "react-native";

const CapacityInfo = ({ capacity }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <IconButton icon="account-group" size={16} color="gray" />
      <Paragraph>
        <Paragraph style={{ fontWeight: "bold" }}>Capacity: </Paragraph>
        {capacity}
      </Paragraph>
    </View>
  );
};

export default CapacityInfo;
