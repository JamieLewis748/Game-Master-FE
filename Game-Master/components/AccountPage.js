import React, { useState, useEffect } from "react";
import { Text, Button, Card, Paragraph, Title, Avatar, IconButton } from "react-native-paper";
import { SafeAreaView, TextInput, Alert, View, Image, StyleSheet, ImageBackground } from "react-native";
import XPBar from "./AccountPage-Components/XPBar";
import CreaturePreview from "./AccountPage-Components/CreaturePreview";
import AccountPageEventList from "./AccountPage-Components/AccountPageEventList";
import { fetchUserByUserId } from "./APIs/returnUsers";


const currentXP = 70;
const maxXP = 100;



const handleCreateEvent = () => {
  navigation.navigate("Create Event");
};

const AccountPage = () => {
  const [currentEventList, setcurrentEventList] = useState([]);
  // const [user, setUser] = useState([]);
  const user = {
    _id: "2",
    name: "Jamie",
    username: "jamie1234",
    email: "jamie@gmail.com",
    img_url: "https://i.pinimg.com/originals/82/4c/75/824c75d5d8baddac1e3ab99a48b77f36.jpg",
    friends: ["2", "3", "4"],
    friendRequestsReceived: ["6", "10", "11", "9"],
    friendRequestsSent: ["5"],
    blocked: [],
    topics: ["Card Games", "RPG"],
    characterStats: {
      name: "Character1",
      level: "7",
      experience: "29",
      experienceToLevelUp: "70",
    },
  };

  useEffect(() => {
    fetchUserByUserId(user.__id)
      .then((userData) => {
        setUser(userData);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Card style={styles.card}>
        <Card.Cover
          source={{
            uri: user.img_url
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
          <Title style={{ color: "white" }}>{user.username}</Title>
          <Title style={{ color: "white" }}>Level: {user.characterStats.level}</Title>
          <XPBar currentXP={user.characterStats.experience} maxXP={user.characterStats.experienceToLevelUp} />
          <View>
            <Text style={styles.xpText}>{`${user.characterStats.experience} / ${user.characterStats.experienceToLevelUp} XP`}</Text>
          </View>
        </Card.Content>
      </Card>
      <Card style={styles.navcard}>
        <Card.Content style={styles.previewBar}>
          <View style={styles.buttonContainer}>
            <Button mode="outlined" onPress={() => console.log("Messages button pressed")}>
              Messages
            </Button>

            <Button mode="outlined" onPress={() => console.log("Friend List button pressed")}>
              Friend List
            </Button>
            <Button mode="outlined" onPress={() => console.log("Collection button pressed")}>
              Collection
            </Button>

          </View>
        </Card.Content>
      </Card>
      <AccountPageEventList />
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
    height: "100%",
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
  },
  eventCard: {
    height: 50,
    backgroundColor: "lightgray",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginHorizontal: 20,
    alignItems: "center",
    height: "100%",
  },
});
export default AccountPage;
