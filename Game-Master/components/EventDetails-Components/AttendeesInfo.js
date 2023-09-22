import React from "react";
import { Paragraph, IconButton } from "react-native-paper";
import { View } from "react-native";

const AttendeesInfo = ({ participants, host }) => {
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <IconButton icon="account-circle" size={16} color="gray" />
        <Paragraph style={{ fontWeight: "bold" }}>
          Currently attending: {`${host} (Host)`}
        </Paragraph>
      </View>

      {participants &&
        participants.map((player, index) => (
          <Paragraph style={{ marginLeft: 30 }} key={index}>
            {"\u2022 "}
            {player}
          </Paragraph>
        ))}
    </View>
  );
};

export default AttendeesInfo;
