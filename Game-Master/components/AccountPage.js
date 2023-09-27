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
import { signOut, onAuthStateChanged, browserPopupRedirectResolver } from "firebase/auth";
import WatchList from "./WatchList";
import { SocketContext } from "./Context/SocketContext";
import io from 'socket.io-client';
import { WatchListContext } from "./Context/WatchListContext";
import MonsterImageSelection from "./CreateEvent-Components/MonsterImageSelect";


// const axiosBase = axios.create({
//   baseURL: "https://game-master-be.onrender.com/api/",
// });
// const fetchUsers = () => axiosBase.get("users");



const AccountPage = ({ navigation }) => {
  const [currentEventList, setcurrentEventList] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const { dbUser, setDbUser } = useContext(DbUserContext);
  const { socket, setSocket } = useContext(SocketContext);
  const { watchList, setWatchList} = useContext(WatchListContext)
  const [userList, setUserList] = useState()
  
  
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
  
  useEffect(() => {
    setWatchList(dbUser.watchList)
  }, [])
  
  // useEffect(() => {
  //   fetchUsers()
  //   .then(({ data }) => {
  //     setUserList(data);
  //     const currentUser = data.filter((user) => {
  //       user.myCreatures.length > 0
  //     console.log(user);
  //     })
  //     console.log(currentUser);

  //   })
  //   .catch((err) => {
  //     console.error("Error fetching events: ", err);
  //   });
  // }, []);
  // console.log(dbUser._id);
  

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
        {dbUser.myCreatures && dbUser.myCreatures.length > 0 ? (
          <FlatList 
          data={dbUser.myCreatures} 
          renderItem={({ item }) => (
          <View>
            <MonsterImageSelection collectionId={item._id} />
          </View>
          )} 
          keyExtractor={(item) => item._id}
          >

          </FlatList>
          ) : (
      <Card style={styles.collectionCard}>
        <Text>Your collection will appear here </Text>
      </Card>
      )}
      </View>
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
          <WatchList watchList={watchList} />
        </Card>
        <Button
          onPress={() => {
            logout();
          }}
        >
          Logout
        </Button>
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
  collectionCard: {
    height: 100,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
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
