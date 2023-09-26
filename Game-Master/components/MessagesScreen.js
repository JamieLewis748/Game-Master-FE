import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import axios from "axios";
import io from "socket.io-client";
import { SocketContext } from "./Context/SocketContest";
import { DbUserContext } from "./Context/UserContext";

const MessagesScreen = () => {
  const { socket } = useContext(SocketContext);
  const { dbUser } = useContext(DbUserContext);
  const [messageData, setMessageData] = useState([
    { msg: "Hello, how are you?" },
    { msg: "I just wanted to say hi!" },
    { msg: "What are your plans for the weekend?" },
    { msg: "Can you help me with this task?" },
    { msg: "The weather is lovely today." },
    { msg: "I'll be there in 10 minutes." },
    { msg: "Did you watch that new movie?" },
    { msg: "Don't forget to buy groceries." },
    { msg: "Let's get wasted" },
    { msg: "Happy birthday! 🎉" },
  ]);

  // useEffect(() => {
  //     setMessageData(messages);
  //     console.log("here")
  // }, []);

  useEffect(() => {
    socket.on("notification", (notification) => {
      setMessageData((prevMessages) => [
        ...prevMessages,
        { msg: notification },
      ]);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  const sendNotification = (to) => {
    if (socket) {
      socket.emit("notification", {
        type: "msg",
        from: dbUser.username,
        to: to,
      });
    } else {
      console.log("Socket is not connected. Unable to send notification.");
    }
  };

  // useEffect(() => {
  //     axios.get('')
  //         .then((response) => {
  //             setMessageData(response.data);
  //         })
  //         .catch((error) => {
  //             console.error('Error fetching messages:', error);
  //         });
  // }, []);

  return (
    <View style={{ flex: 1 }}>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "lightgray" : "white",
          },
          styles.pressable,
        ]}
        onPress={() => sendNotification("jamie1234")}
      >
        <Text>jamie1234</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "lightgray" : "white",
          },
          styles.pressable,
        ]}
        onPress={() => sendNotification("bananaCatMassiv")}
      >
        <Text>bananaCatMassiv</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "lightgray" : "white",
          },
          styles.pressable,
        ]}
        onPress={() => sendNotification("tree1")}
      >
        <Text>tree1</Text>
      </Pressable>
      <Text style={{ fontSize: 24, fontWeight: "bold", margin: 16 }}>
        Messages
      </Text>
      <FlatList
        data={messageData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 16 }}>
            <Text>{item.msg}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = {
  pressable: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
};

export default MessagesScreen;
