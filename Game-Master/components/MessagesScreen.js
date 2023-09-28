import React, { useEffect, useState, useContext, useRef } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import axios from "axios";
import io from "socket.io-client";
import { SocketContext } from "./Context/SocketContext";
import { DbUserContext } from "./Context/UserContext";
import { NotificationCountContext } from "./Context/NotificationCountContext";
import notificationPingSound from '../assets/Sound/ping-82822.mp3'
import { useNavigation, useRoute } from "@react-navigation/native"

const MessagesScreen = () => {
  const { socket } = useContext(SocketContext);
  const { setNotificationCount } = useContext(NotificationCountContext)
  const [messageData, setMessageData] = useState([{ msg: "Thank you for joining Game-Master :)" }]);

  const navigation = useNavigation();
  const route = useRoute();

  function playNotificationSound() {
    new Audio(notificationPingSound).play()
  }

  useEffect(() => {
    setMessageData((prevMessages) => [...prevMessages].reverse());
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setNotificationCount(0);
    });

    socket.on("notification", (notification) => {
      setMessageData((prevMessages) => [
        { msg: notification },
        ...prevMessages,
      ]);
      setNotificationCount((prevCount) => ++prevCount);
      playNotificationSound()
    });

    return () => {
      unsubscribe()
      socket.off("notification");
    };
  }, [route]);

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", margin: 16 }}>
        Messages
      </Text>
      <FlatList
        data={messageData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.msg}</Text>
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
  messageContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd", 
    borderRadius: 8, 
    marginBottom: 12,
  },
  messageText: {
    fontSize: 16
  },
};

export default MessagesScreen;
