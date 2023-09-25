import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  Button,
  Card,
  Paragraph,
  Title,
  Avatar,
  IconButton,
} from "react-native-paper";
import {
  SafeAreaView,
  TextInput,
  Alert,
  View,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";

import XPBar from "./AccountPage-Components/XPBar";
import CreaturePreview from "./AccountPage-Components/CreaturePreview";
import AccountPageEventList from "./AccountPage-Components/AccountPageEventList";
import { fetchUserByUserId } from "./APIs/returnUsers";
import { UserContext, DbUserContext } from "./Context/UserContext";
import { auth } from "./Authentication/firebase-config";
import { signOut } from "firebase/auth";
import WatchList from "./WatchList";

const AccountPage = ({ navigation }) => {
  const [currentEventList, setcurrentEventList] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const { dbUser, setDbUser } = useContext(DbUserContext);

  if (user === null) {
    navigation.navigate("Login");
  }

  setDbUser({
    _id: "2",
    name: "Jamie",
    username: "jamie1234",
    email: "dfsfsdfs",
    img_url:
      "https://i.pinimg.com/originals/82/4c/75/824c75d5d8baddac1e3ab99a48b77f36.jpg",
    friends: ["2", "3", "4"],
    friendRequestsReceived: ["6", "10", "11", "9"],
    friendRequestsSent: ["5"],
    blocked: [],
    topics: ["Card Games", "RPG"],
    watchList: ["00000020f51bb4362eee2e06", "00000020f51bb4362eee2e02"],
    characterStats: {
      name: "Character1",
      level: "7",
      experience: "29",
      experienceToLevelUp: "70",
    },
  });

  async function logout() {
    try {
      await signOut(auth);
      navigation.navigate("Login");
    } catch (error) {
      navigation.navigate("Login");
      console.log(error.message);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Card style={styles.card}>
        <Card.Cover
          source={{
            uri: dbUser.img_url,
          }}
          resizeMode="cover"
          style={styles.container}
        />
        <Card.Content style={styles.content}>
          <Card.Cover
            source={{
              uri: "https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=740",
            }}
            resizeMode="cover"
            style={styles.cover}
          />
          <Title style={{ color: "white" }}>{dbUser.username}</Title>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Level: {dbUser.characterStats.level}
          </Text>
          <XPBar
            currentXP={dbUser.characterStats.experience}
            maxXP={dbUser.characterStats.experienceToLevelUp}
          />
          <View>
            <Text
              style={styles.xpText}
            >{`${dbUser.characterStats.experience} / ${dbUser.characterStats.experienceToLevelUp} XP`}</Text>
          </View>
        </Card.Content>
      </Card>
      <Card>
        <WatchList watchList={dbUser.watchList} navigation={navigation} />
      </Card>
    </SafeAreaView>
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
    flex: 1,
    flexDirection: "row",
  },
});
export default AccountPage;
