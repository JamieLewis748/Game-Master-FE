import React from "react";
import { Paragraph, IconButton } from "react-native-paper";
import { View, Image } from "react-native";

const AttendeesInfo = ({ userList, host, participants }) => {
  const users = userList.filter((user) => participants.includes(user._id));


  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <IconButton icon="account-circle" size={16} color="gray" style={{}} />
        <Paragraph style={{ fontWeight: "bold" }}>
          Currently attending:
        </Paragraph>
      </View>
      {users &&
        users.map((user, index) => (
          <View
            style={{ flexDirection: "row", alignItems: "center" }}
            key={index}
          >
            <Paragraph
              style={{
                fontWeight: 400,
                marginTop: 5
              }}
            >
              {user.img_url ? (
                <Image
                  source={{ uri: user.img_url }}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    marginRight: 15,
                    marginBottom: -10
                  }}
                />
              ) : null}

              {user.username}
              {user._id === host && " (Host)"}
            </Paragraph>
          </View>
        ))}
    </View>
  );
};

export default AttendeesInfo;
