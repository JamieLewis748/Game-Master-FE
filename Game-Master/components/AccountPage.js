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
  ScrollView,
  FlatList,
} from "react-native";

import XPBar from "./AccountPage-Components/XPBar";
import CreaturePreview from "./AccountPage-Components/CreaturePreview";
import AccountPageEventList from "./AccountPage-Components/AccountPageEventList";
import { fetchUserByUserId } from "./APIs/returnUsers";
import { UserContext, DbUserContext } from "./Context/UserContext";
import { auth } from "./Authentication/firebase-config";
import {
  signOut,
  onAuthStateChanged,
  browserPopupRedirectResolver,
} from "firebase/auth";
import WatchList from "./WatchList";
import { SocketContext } from "./Context/SocketContext";
import io from "socket.io-client";
import { WatchListContext } from "./Context/WatchListContext";
import MonsterImageSelection from "./CreateEvent-Components/MonsterImageSelect";
import { collectionData } from "../assets/data/collection.data";

const AccountPage = ({ navigation }) => {
  const [currentEventList, setcurrentEventList] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const { dbUser, setDbUser } = useContext(DbUserContext);
  const { socket, setSocket } = useContext(SocketContext);
  const { watchList, setWatchList } = useContext(WatchListContext);

  if (user === null) {
    navigation.navigate("Login");
  }

  useEffect(() => {
    const newSocket = io("https://socket-server-3xoa.onrender.com");

    newSocket.on("connect", () => {
      console.log("Connected to the WebSocket server");
      newSocket.emit("join", dbUser.username);
    });

    setSocket(newSocket);
  }, []);

  useEffect(() => {
    setWatchList(dbUser.watchList);
  }, []);

  async function logout() {
    try {
      await signOut(auth);
      navigation.navigate("Login");
    } catch (error) {
      navigation.navigate("Login");
      console.log(error.message);
    }
  }

  console.log(dbUser)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "purple" }}>
      <Card style={styles.card}>
        <Card.Cover
          source={{
            uri: "https://i.pinimg.com/originals/82/4c/75/824c75d5d8baddac1e3ab99a48b77f36.jpg",
          }}
          resizeMode="cover"
          style={styles.container}
        />
        <Card.Content style={styles.content}>
          {dbUser.img_url && (
            <Card.Cover
              source={{
                uri: dbUser.img_url,
              }}
              resizeMode="cover"
              style={styles.cover}
            />
          )}
          {!dbUser.img_url && (
            <Card.Cover
              source={{
                uri: "https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=740",
              }}
              resizeMode="cover"
              style={styles.cover}
            />
          )}

          <Title style={{ color: "black", fontWeight: 700, fontSize: 30 }}>
            {dbUser.username}
          </Title>
          <Text style={styles.xpText}>
            Level: {dbUser.characterStats[0].level}
          </Text>
          <XPBar
            currentXP={Number(dbUser.characterStats[0].experience)}
            maxXP={Number(dbUser.characterStats[0].experienceToLevelup)}
          />
          <View>
            <Text
              style={styles.xpText}
            >{`${dbUser.characterStats[0].experience} / ${dbUser.characterStats[0].experienceToLevelup} XP`}</Text>
          </View>
        </Card.Content>
      </Card>
      <View>
        {dbUser.myCreatures && dbUser.myCreatures.length > 0 ? (
          <Card style={styles.collectionCard}>
            <FlatList
              data={dbUser.myCreatures}
              renderItem={({ item }) => (
                <View style={styles.monsterView}>
                  <MonsterImageSelection collectionId={item._id} />
                </View>
              )}
              keyExtractor={(item) => item._id}
              horizontal={true}
            ></FlatList>
          </Card>
        ) : (
          <Card style={styles.collectionCard}>
            <Text>Your collection will appear here </Text>
          </Card>
        )}
      </View>
      <ScrollView>
        <Card
          style={{
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
          }}
        >
          <WatchList watchList={watchList} />
        </Card>
        <Button
          title="Logout"
          style={styles.cardButtons}
          onPress={() => {
            logout();
          }}
        >
          Logout{" "}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 380,
    position: "relative",
  },
  card: {
    width: "90%",
    overflow: "hidden",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    height: "45%",
    marginBottom: 10,
  },
  collectionCard: {
    height: 100,
    marginLeft: 10,
    marginRight: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
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
    color: "black",
    fontWeight: 600,
    marginTop: 5,
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
  monsterView: {
    margin: 5,
  },
  cardButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "darkviolet",
    marginBottom: 15,
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
});
export default AccountPage;
