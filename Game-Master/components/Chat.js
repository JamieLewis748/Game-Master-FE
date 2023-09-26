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
import { useState, useEffect, useRef } from "react";
import io from 'socket.io-client';
import { UserContext, DbUserContext } from "./Context/UserContext";

const friends = [
    { username: "jamie1234" },
    { username: "bananaCatMassiv" },
    { username: "tree1" },
    { username: "ian123" },
    { username: "user5" },
    { username: "user6" },
    { username: "user7" },
    { username: "user8" },
    { username: "user9" },
    { username: "user10" }
];

const Chat = () => {
    const { dbUser, setDbUser } = useContext(DbUserContext)
    const [sendingTo, setSendingTo] = useState("User 1")
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState(null);
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
        const newSocket = io('https://socket-server-3xoa.onrender.com');

        newSocket.on('connect', () => {
            console.log('Connected to the WebSocket server');
            newSocket.emit('join', dbUser.username);
        });

        newSocket.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, { isMyMessage: false, msg: msg.receivedMessage }]);

            if (scrollViewRef.current) {
                scrollViewRef.current.scrollToEnd({ animated: true });
            }
        });

        setSocket(newSocket);
        return () => {
            newSocket.off('chat message');
        };
    }, []);


    return (
        <View style={styles.centered}>
            <View style={styles.friendsContainer}>
                <Text style={styles.chatTitle}>Friend chat</Text>
                <ScrollView showsVerticalScrollIndicator = {false}>
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
                <ScrollView ref={scrollViewRef}
                    onContentSizeChange={() => {
                        if (scrollViewRef.current) {
                            scrollViewRef.current.scrollToEnd({ animated: true });
                        }
                    }}
                    showsVerticalScrollIndicator = {false}
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
                    <TextInput value={message} onChangeText={setMessage}></TextInput>
                    <Pressable onPress={sendMessage}><Text>Send</Text></Pressable>
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
