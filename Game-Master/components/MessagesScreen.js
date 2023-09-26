import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

const MessagesScreen = () => {
    const [messageData, setMessageData] = useState([]);

    const initialMessages = [
        { msg: 'Hello, how are you?' },
        { msg: 'I just wanted to say hi!' },
        { msg: 'What are your plans for the weekend?' },
        { msg: 'Can you help me with this task?' },
        { msg: 'The weather is lovely today.' },
        { msg: "I'll be there in 10 minutes." },
        { msg: 'Did you watch that new movie?' },
        { msg: "Don't forget to buy groceries." },
        { msg: "Let's get wasted" },
        { msg: 'Happy birthday! 🎉' },
    ];

    useEffect(() => {
        setMessageData(initialMessages);
    }, []);
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
        <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 16 }}>Messages</Text>
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

export default MessagesScreen;