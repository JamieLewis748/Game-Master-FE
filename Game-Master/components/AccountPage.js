import React, { useState } from "react";
import { Text, Button, Card, Paragraph, Title, Avatar, IconButton } from "react-native-paper";
import { SafeAreaView, TextInput, Alert, View, Image, StyleSheet, ImageBackground } from "react-native";
import usersTestData from "../assets/data/user.data";
import XPBar from "./AccountPage-Components/XPBar";
import CreaturePreview from "./AccountPage-Components/CreaturePreview";
import AccountPageEventList from "./AccountPage-Components/AccountPageEventList";

const currentXP = 70;
const maxXP = 100;

const handleCreateEvent = () => {
  navigation.navigate("Create Event");
};

const AccountPage = () => {
  const [currentEventList, setcurrentEventList] = useState([]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Card style={styles.card}>
        <Card.Cover
          source={{
            uri: "https://i.pinimg.com/originals/82/4c/75/824c75d5d8baddac1e3ab99a48b77f36.jpg",
          }}
          resizeMode="cover"
          style={styles.container}
        />
        <Card.Content style={styles.content}>
          <Card.Cover
            source={{
              uri: "https://t3.ftcdn.net/jpg/02/22/85/16/360_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg",
            }}
            resizeMode="cover"
            style={styles.cover}
          />
          <Title style={{ color: "white" }}>Hello World</Title>
          <XPBar currentXP={currentXP} maxXP={maxXP} />
          <View>
            <Text style={styles.xpText}>{`${currentXP} / ${maxXP} XP`}</Text>
          </View>
        </Card.Content>
      </Card>
      <Card style={styles.navcard}>
        <Card.Content style={styles.previewBar}></Card.Content>
      </Card>
      <Eventlist />
    </SafeAreaView >
  );
};
const styles = StyleSheet.create({
  container: {
    height: 250,
    position: "relative",
  },
  card: {
    width: "90%",
    overflow: "hidden",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    height: "40%",
    marginBottom: 20,
  },
  cover: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 50,
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
  },

  xpText: {
    color: "white",
  },
  navcard: {
    backgroundColor: "white",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    height: "15%",
  },
  previewBar: {
    alignItems: "center",
    flexDirection: "row",
  },
  eventCard: {
    height: 50,
    backgroundColor: "lightgray",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default AccountPage;
