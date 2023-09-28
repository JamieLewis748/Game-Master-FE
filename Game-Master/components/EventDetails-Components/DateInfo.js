import react from "react";
import { Paragraph, IconButton } from "react-native-paper";
import { View } from "react-native";

const DateInfo = ({ date }) => {
  const justDate = date.split(" ")[0];
  const formattedDate = new Date(`${justDate}`).toLocaleDateString("en-GB");
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <IconButton icon="calendar" size={16} color="gray" />
      <Paragraph>
        <Paragraph style={{ fontWeight: "bold" }}></Paragraph>
        {formattedDate}
      </Paragraph>
    </View>
  );
};

export default DateInfo;
