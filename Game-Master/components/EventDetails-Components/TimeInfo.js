import react from "react";
import { Paragraph, IconButton } from "react-native-paper";
import { View } from "react-native";

const TimeInfo = ({ time }) => {
  const justTime = time.split(" ")[1];
  const formattedTime = new Date(`1991-01-01T${justTime}Z`).toLocaleTimeString(
    "en-GB",
    { hour: "2-digit", minute: "2-digit" }
  );
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <IconButton icon="clock-outline" size={16} color="gray" />
      <Paragraph>
        <Paragraph style={{ fontWeight: "bold" }}></Paragraph>
        {formattedTime}
      </Paragraph>
    </View>
  );
};

export default TimeInfo;
