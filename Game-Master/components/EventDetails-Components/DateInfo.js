import react from "react";
import { Paragraph, IconButton } from "react-native-paper";
import { View } from "react-native";

const DateInfo = ({ date }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <IconButton icon="calendar" size={16} color="gray" />
      <Paragraph>
        <Paragraph style={{ fontWeight: "bold" }}>Date: </Paragraph>
        {date}
      </Paragraph>
    </View>
  );
};

export default DateInfo;
