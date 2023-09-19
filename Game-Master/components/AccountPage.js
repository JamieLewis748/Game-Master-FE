import React, { useState } from "react";
import {
    Text,
    Button,
    Card,
    Paragraph,
    Title,
    Avatar,
    IconButton,
} from "react-native-paper";
import { SafeAreaView, TextInput, Alert, View, Image, StyleSheet, ImageBackground } from "react-native";
import usersTestData from "../assets/data/user.data";



const AccountPage = () => {
    return (
        <Card>
            <Card.Cover
                source={{ uri: "https://i.pinimg.com/originals/82/4c/75/824c75d5d8baddac1e3ab99a48b77f36.jpg" }}
                resizeMode="cover"
                style={styles.container}
            />
            <Card.Content style={styles.content}>
                <Card.Cover
                    source={{ uri: "https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=740" }}
                    resizeMode="cover"
                    style={styles.cover}
                />
                <Title >Hello World</Title>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 200,
        position: 'relative'
    },
    cover: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 50
    },

    content: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }


});

export default AccountPage;