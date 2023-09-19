import react from "react";
import { Paragraph, IconButton } from "react-native-paper";
import { View } from "react-native";

const DateInfo = ({ description }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <IconButton icon="clock-outline" size={16} color="gray" />
      <Paragraph>
        <Paragraph style={{ fontWeight: "bold" }}>Date: </Paragraph>
        {description}
      </Paragraph>
    </View>
  );
};

export default DateInfo;
