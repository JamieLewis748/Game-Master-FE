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
        <ImageBackground style={styles.cardBackground} source={{ uri: "https://i.pinimg.com/originals/82/4c/75/824c75d5d8baddac1e3ab99a48b77f36.jpg" }}>
            <Card>
                <Card.Content style={styles.container}>
                    <Card.Cover style={styles.cover} source={{ uri: "https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=740" }} />
                    <Title>Hello World</Title>
                </Card.Content>
            </Card>
        </ImageBackground>
    );

};


const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     alignItems: "center"
    // },
    cover: {
        height: 100,
        width: 100,
        justifyContent: "center",
    },
    cardBackground: {
        width: "90%",
        alignSelf: "center",
        marginTop: 30
    }

});

export default AccountPage;