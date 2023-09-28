import React, { useContext } from "react";
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    Image,
    Pressable,
    Dimensions,
    ScrollView,
    SafeAreaView,
    TextInput,
    Alert,
    ImageBackground,
} from "react-native";
import { Button } from "react-native-paper"
import { useState, useEffect, useRef } from "react";
import { DbUserContext } from "./Context/UserContext";
import { SocketContext } from "./Context/SocketContext";

const friends = [
    { username: "jamie1234" },
    { username: "bananaCatMassiv" },
    { username: "tree1" },
    { username: "ian123" },
    { username:"northcoder1" }
];

const Chat = () => {
    const { dbUser, setDbUser } = useContext(DbUserContext)
    const [sendingTo, setSendingTo] = useState("User 1")
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const { socket, setSocket } = useContext(SocketContext);
    const [loading, setLoading] = useState(false)
    const scrollViewRef = useRef(null);

    function sendMessage() {
        socket.emit('chat message', { receivedMessage: message, from: dbUser.username, to: sendingTo });
        setMessages((prevMessages) => [...prevMessages, { isMyMessage: true, msg: message, username: "randomuser" }]);
        setMessage("");

        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }

    useEffect(() => {
        socket.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, { isMyMessage: false, msg: msg.receivedMessage }]);

            if (scrollViewRef.current) {
                scrollViewRef.current.scrollToEnd({ animated: true });
            }
        });

        return () => {
            socket.off('chat message');
        };
    }, []);


    return (
        <View style={styles.centered}>
            <View style={styles.friendsContainer}>
                <Text style={styles.chatTitle}>Friend chat</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {friends.map((friend) => (
                        <View key={friend.username} style={styles.friendContainer}>
                            <Pressable
                                style={styles.button}
                                onPress={() => setSendingTo(friend.username)}
                            >
                                <Text style={styles.buttonText}>{friend.username}</Text>
                            </Pressable>
                        </View>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.messagesContainer}>
                <View>
                    {sendingTo === "User 1" ? (
                        null
                    ) : (
                        <Text>Messaging: {sendingTo}</Text>
                    )}
                </View>
                <ScrollView ref={scrollViewRef}
                    onContentSizeChange={() => {
                        if (scrollViewRef.current) {
                            scrollViewRef.current.scrollToEnd({ animated: true });
                        }
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    {messages.map((message, index) => (
                        <Text
                            key={index}
                            style={[
                                styles.message,
                                message.isMyMessage ? styles.sent : styles.received,
                            ]}
                        >
                            {message.msg}
                        </Text>
                    ))}
                </ScrollView>
                <View>
                    <TextInput
                        value={message}
                        onChangeText={setMessage}
                        style={{
                            borderWidth: 3,
                            borderColor: 'purple',
                            borderRadius: 10,
                            padding: 10,
                            marginBottom: 10,
                        }}
                    />
                    <Pressable
                        onPress={sendMessage}
                        title="Send"
                        style={{
                            padding: 10,
                            borderRadius: 5,
                            borderWidth: 3,
                            borderColor: 'gray',
                            
                        }}>
                        <Text style={{ color: "#000000", backgroundColor: "transparent", textAlign: "center", fontWeight: 800}}>Send</Text>

                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    flexDirection: "row",
  },
  friendsContainer: {
    flex: 3,
    backgroundColor: "rgb(37,35,42)",
    padding: 16,
  },
  messagesContainer: {
    flex: 7,
    backgroundColor: "gainsboro",
    padding: 16,
  },
  friendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    backgroundColor: "purple",
    borderRadius: 10,
  },
  friendText: {
    fontWeight: "bold",
    backgroundColor: "transparent",
  },
  button: {
    backgroundColor: "transparent",
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  chatTitle: {
    fontWeight: "bold",
    marginBottom: 16,
    color: "white",
  },
  message: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    maxWidth: "70%",
    borderWidth: 5,
    borderColor: "purple",
  },
  sent: {
      backgroundColor: "darkviolet",
      borderRadius: 10,
    color: "#fff",
    textAlign: "right",
  },
  received: {
    backgroundColor: "purple",
    color: "white",
    textAlign: "left",
  },
});

export default Chat;
