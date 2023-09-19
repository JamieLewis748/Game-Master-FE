import React from "react";
import { Paragraph, IconButton } from "react-native-paper";
import { View } from "react-native";

const AttendeesInfo = ({ attendees }) => {
  console.log(attendees);
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <IconButton icon="account-circle" size={16} color="gray" />
        <Paragraph style={{ fontWeight: "bold" }}>
          Currently attending:
        </Paragraph>
      </View>

      {attendees &&
        attendees.map((player, index) => (
          <Paragraph key={index}>{player}</Paragraph>
        ))}
    </View>
  );
};

export default AttendeesInfo;
