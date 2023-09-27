import {
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  View,
  ScrollView,
  Pressable,
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

const axiosBase = axios.create({
  baseURL: "https://game-master-be.onrender.com/api/",
});

const fetchUsers = () => axiosBase.get("users");

const EventDetails = ({ route }) => {
  const { selectedEvent } = route.params;
  const {dbUser} = useContext(DbUserContext)
  const [requestInviteState, setRequestInviteState] = useState("Request Invite")

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then(({ data }) => {
        setUserList(data);
      })
      .catch((err) => {
        console.error("Error fetching events: ", err);
      });
  }, []);

  return (
    <ScrollView>
      <SafeAreaView
        style={{
          backgroundColor: "purple",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Card
          style={{
            margin: "auto",
            height: "97%",
            marginTop: 10,
          }}
        >
          {/* <Card.Content style={styles.eventCard}> */}
          {/* <Card.Cover source={{ uri: selectedEvent.image }} /> */}

          <View style={styles.eventCard}>
            <Image
              style={styles.eventImage}
              source={require(`../assets/gameType/${
                selectedEvent.gameType.split(" ")[0]
              }.jpg`)}
            />
          </View>
          <View>
            <EventHeading gameInfo={selectedEvent.gameInfo} />
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
              <PublicInfo public={selectedEvent.public} />
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
          {/* </Card.Content> */}
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
                <Text style={styles.alreadyReq}>Already requested</Text>
              ) : (
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
    width: 400,
    height: 250,
    margin: 15,
    borderRadius: 10,
  },
  cardButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "purple",
  },
  alreadyReq: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 15
  },
  eventAllInfo: {
    marginLeft: 25,
    marginRight: 25,
    display: "flex",
    justifyContent: "center",
  }
});

export default EventDetails;
