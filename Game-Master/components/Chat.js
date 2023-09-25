import React from "react";
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
import { useState, useEffect } from "react";
import io from 'socket.io-client';

const friends = [
    { username: "user1" },
    { username: "user2" },
    { username: "user3" },
    { username: "user4" },
    { username: "user5" },
    { username: "user6" },
    { username: "user7" },
    { username: "user8" },
    { username: "user9" },
    { username: "user10" }
];

const Chat = () => {
    console.log("Chat component rendered");
    const [user, setUser] = useState("User 1");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(false)

    function sendMessage() {
        socket.emit('chat message', { receivedMessage: message, from: user, to: user });
        setMessages((prevMessages) => [...prevMessages, { isMyMessage: true, msg: message, username: "randomuser" }]);
        setMessage("");
    }

    useEffect(() => {
        const newSocket = io('https://socket-server-3xoa.onrender.com');
        console.log("here");

        newSocket.on('connect', () => {
            console.log('Connected to the WebSocket server');
            newSocket.emit('join', user);
        });

        newSocket.on('chat message', (msg) => {
            console.log(msg)
            setMessages((prevMessages) => [...prevMessages, { isMyMessage: false, msg: msg.receivedMessage }]);
        });

        setSocket(newSocket);
        return () => {
            newSocket.off('chat message');
        };
    }, []);

    useEffect(() => {
        setLoading(true)
        
    }, []);


    return (
        <View style={styles.centered}>
            <View style={styles.friendsContainer}>
                <Text style={styles.chatTitle}>Friend chat</Text>
                <ScrollView>
                    {friends.map((friend) => (
                        <View key={friend.username} style={styles.friendContainer}>
                            <Text style={styles.friendText}>{friend.username}</Text>
                            <Pressable
                                style={styles.button}
                                onPress={() => handleButtonClick(friend.username)}
                            >
                                <Text style={styles.buttonText}>Message</Text>
                            </Pressable>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.messagesContainer}>
                {messages.map((message, index) => (
                    <Text key={index}>{message.msg}</Text>
                ))}
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
        flex: 1,
        backgroundColor: '#F0F0F0',
        padding: 16,
    },
    messagesContainer: {
        flex: 4,
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
});

export default Chat;
