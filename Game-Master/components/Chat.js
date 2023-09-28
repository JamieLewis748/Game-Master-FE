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
    { username: "ian123" }
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
                            borderWidth: 1,
                            borderColor: 'gray',
                            borderRadius: 10,
                            padding: 10,
                            marginBottom: 10,
                        }}
                    />
                    <Button
                        onPress={sendMessage}
                        title="Send"
                        color="#007AFF"
                        style={{
                            padding: 10,
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: '#007AFF',
                        }}>
                        <Text style={{ color: "#000000" }}>Send</Text>

                    </Button>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        flexDirection: 'row',
    },
    friendsContainer: {
        flex: 3,
        backgroundColor: '#F0F0F0',
        padding: 16,
    },
    messagesContainer: {
        flex: 7,
        backgroundColor: '#FFFFFF',
        padding: 16,
    },
    friendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    friendText: {
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 8,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    chatTitle: {
        fontWeight: 'bold',
        marginBottom: 16,
    },
    message: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        maxWidth: '70%',
    },
    sent: {
        backgroundColor: '#007bff',
        color: '#fff',
        textAlign: 'right',
    },
    received: {
        backgroundColor: '#f0f0f0',
        color: '#000',
        textAlign: 'left',
    },
});

export default Chat;
