import {
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Dimensions,
  useWindowDimensions,
} from "react-native";
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
import DateInfo from "./EventDetails-Components/DateInfo";
import CapacityInfo from "./EventDetails-Components/CapacityInfo";
import PublicInfo from "./EventDetails-Components/PublicInfo";
import AttendeesInfo from "./EventDetails-Components/AttendeesInfo";
import TimeInfo from "./EventDetails-Components/TimeInfo";
import EventHeading from "./EventDetails-Components/EventHeading";
import axios from "axios";
import requestInvite from "./APIs/requestInvite";
import { DbUserContext } from "./Context/UserContext";
import modifyWatchList from "./APIs/modifyWatchList";
import { useNavigation } from "@react-navigation/native";
import completeEvent from "./APIs/completeEvent";
import MonsterPrize from "./EventDetails-Components/MonsterPrize";
import { WatchListContext } from "./Context/WatchListContext";

const axiosBase = axios.create({
  baseURL: "https://game-master-be.onrender.com/api/",
});

const fetchUsers = () => axiosBase.get("users");

const EventDetails = ({ route }) => {
  const { selectedEvent } = route.params;
  const { dbUser } = useContext(DbUserContext);
  const { watchList, setWatchList } = useContext(WatchListContext);
  const [requestInviteState, setRequestInviteState] = useState("Request Invite");
  const [userList, setUserList] = useState([]);
  const navigation = useNavigation();
  

  useEffect(() => {
    fetchUsers()
      .then(({ data }) => {
        setUserList(data);
      })
      .catch((err) => {
        console.error("Error fetching events: ", err);
      });
  }, []);

  const handleWatchlist = (selectedEvent) => {
    modifyWatchList(dbUser._id, selectedEvent._id, setWatchList, watchList);
  };

  console.log(selectedEvent)

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView
        style={{
          backgroundColor: "purple",
          display: "flex",
          flex: 1,
        }}
      >
        <Card
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            height: "97%",
            width: "95%",
            margin: "auto",
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          <View>
            <EventHeading gameInfo={selectedEvent.gameInfo} />
          </View>
          <Card.Content style={styles.cardContentContainer}>
            <View>
              <Image
                style={styles.eventImage}
                source={require(`../assets/gameType/${
                  selectedEvent.gameType.split(" ")[0]
                }.jpg`)}
              />
            </View>
            <View style={styles.eventAllInfo}>
              <View style={styles.eventView}>
                <TimeInfo time={selectedEvent.dateTime} />
                <DateInfo date={selectedEvent.dateTime} />
              </View>
              <View style={styles.eventView}>
                <CapacityInfo
                  capacity={selectedEvent.capacity}
                  participants={selectedEvent.participants.length}
                />
                <PublicInfo public={selectedEvent.isPublic} />
              </View>
              <View styles={styles.attendeeList}>
                {userList.length > 0 && (
                  <AttendeesInfo
                    userList={userList}
                    host={selectedEvent.hostedBy}
                    participants={selectedEvent.participants}
                  />
                )}
              </View>
            </View>
          </Card.Content>
          <View style={styles.prizeWrapper}>
            <MonsterPrize
              style={styles.prize}
              collectionId={selectedEvent.prizeCollection_id}
            />
          </View>
          <Card.Actions>
            <View
              style={{
                flex: 1,
                marginTop: 40,
                marginLeft: 100,
                marginRight: 100,
                marginBottom: 100,
              }}
            >
              {selectedEvent.participants.includes(dbUser._id) ||
              selectedEvent.requestedToParticipate.includes(dbUser._id) ? (
                <>
                  {watchList.includes(selectedEvent._id) ? (
                    <>
                      <Button
                        title="Watchlist"
                        mode="contained"
                        colour="purple"
                        style={styles.cardButtons}
                        onPress={() => handleWatchlist(selectedEvent)}
                      >
                        <Text>Remove from WatchList</Text>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        title="Watchlist"
                        mode="contained"
                        colour="purple"
                        style={styles.cardButtons}
                        onPress={() => handleWatchlist(selectedEvent)}
                      >
                        <Text>Add to WatchList</Text>
                      </Button>
                    </>
                  )}
                  <Text style={styles.alreadyReq}>Already requested</Text>
                  <Button
                    title="BackToEventList"
                    mode="contained"
                    colour="purple"
                    style={styles.cardButtons}
                    onPress={() => navigation.navigate("EventsPage")}
                  >
                    <Text>Back to Events</Text>
                  </Button>
                </>
              ) : (
                <>
                  {watchList.includes(selectedEvent._id) ? (
                    <>
                      <Button
                        title="Watchlist"
                        mode="contained"
                        colour="purple"
                        style={styles.cardButtons}
                        onPress={() => handleWatchlist(selectedEvent)}
                      >
                        <Text>Remove from WatchList</Text>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        title="Watchlist"
                        mode="contained"
                        colour="purple"
                        style={styles.cardButtons}
                        onPress={() => handleWatchlist(selectedEvent)}
                      >
                        <Text>Add to WatchList</Text>
                      </Button>
                    </>
                  )}
                  <Button
                    mode="contained"
                    colour="purple"
                    style={styles.cardButtons}
                    onPress={() => {
                      if (requestInviteState === "Request Invite") {
                        requestInvite(
                          selectedEvent._id,
                          dbUser._id,
                          setRequestInviteState
                        );
                      }
                    }}
                  >
                    <Text>{requestInviteState}</Text>
                  </Button>
                  <Button
                    title="backToEvents"
                    mode="contained"
                    colour="purple"
                    style={styles.cardButtons}
                    onPress={() => navigation.navigate("EventsPage")}
                  >
                    <Text>Back to Events</Text>
                  </Button>
                </>
              )}
            </View>
          </Card.Actions>
        </Card>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  eventCard: {},
  eventView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  eventImage: {
    // width: "90%",
    height: 300,
    marginLeft: 25,
    marginRight: 25,
    display: "flex",
    justifyContent: "center",
    borderRadius: 10,
  },
  cardButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "purple",
    marginBottom: 15,
    marginTop: 15,
  },
  alreadyReq: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 15,
  },
  eventAllInfo: {
    marginLeft: 25,
    marginRight: 25,
    display: "flex",
    justifyContent: "center",
  },
  prize: {
    display: "flex",
    justifyContent: "center",
    width: 50,
    height: 50,
    
  },
  prizeWrapper: {
    width: "100%",
    height: 70,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 25
  }
});

export default EventDetails;
