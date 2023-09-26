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
} from "react-native";

import XPBar from "./AccountPage-Components/XPBar";
import CreaturePreview from "./AccountPage-Components/CreaturePreview";
import AccountPageEventList from "./AccountPage-Components/AccountPageEventList";
import { fetchUserByUserId } from "./APIs/returnUsers";
import { UserContext, DbUserContext } from "./Context/UserContext";
import { auth } from "./Authentication/firebase-config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import WatchList from "./WatchList";
import { SocketContext } from "./Context/SocketContest";
import io from 'socket.io-client';

const AccountPage = ({ navigation }) => {
  const [currentEventList, setcurrentEventList] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const { dbUser, setDbUser } = useContext(DbUserContext);
  const { socket, setSocket } = useContext(SocketContext);

  if (user === null) {
    navigation.navigate("Login");
  }

  useEffect(() => {
    const newSocket = io('https://socket-server-3xoa.onrender.com');

    newSocket.on('connect', () => {
      console.log('Connected to the WebSocket server');
      newSocket.emit('join', dbUser.username);
    });

    setSocket(newSocket)
  }, [])

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setUser(user);
  //   });

  //   return () => unsubscribe();
  // }, []);

  console.log(dbUser)

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "purple" }}>
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
            Level: {dbUser.characterStats[0].level}
          </Text>
          <XPBar
            currentXP={dbUser.characterStats[0].experience}
            maxXP={dbUser.characterStats[0].experienceToLevelUp}
          />
          <View>
            <Text
              style={styles.xpText}
            >{`${dbUser.characterStats[0].experience} / ${dbUser.characterStats[0].experienceToLevelup} XP`}</Text>
          </View>
        </Card.Content>
      </Card>
      <View>
        <Paragraph style={{ marginLeft: 12, fontWeight: "bold", fontSize: 15 }}>
          Watching:
        </Paragraph>
      </View>
      <ScrollView>
        <Card
          style={{
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <WatchList watchList={dbUser.watchList} />
        </Card>
      </ScrollView>
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
    height: "45%",
    marginBottom: 10,
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
