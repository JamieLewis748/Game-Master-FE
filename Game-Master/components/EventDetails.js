import { SafeAreaView, FlatList, Image, StyleSheet, View } from "react-native";
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
import DateInfo from "./EventDetails-Components/DateInfo";
import CapacityInfo from "./EventDetails-Components/CapacityInfo";
import PublicInfo from "./EventDetails-Components/PublicInfo";
import AttendeesInfo from "./EventDetails-Components/AttendeesInfo";
import TimeInfo from "./EventDetails-Components/TimeInfo";
import DescriptionInfo from "./EventDetails-Components/DescriptionInfo";

const EventDetails = ({ route }) => {
  const { selectedEvent } = route.params;

  return (
    <SafeAreaView style={{ backgroundColor: "#B6D0E2" }}>
      <Card style={{ margin: "auto" }}>
        <Card.Content style={styles.eventCard}>
          <Card.Cover source={{ uri: selectedEvent.image }} />
          <View>
            <DescriptionInfo gameInfo={selectedEvent.gameInfo} />
          </View>
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
            <AttendeesInfo
              participants={selectedEvent.participants}
              host={selectedEvent.hostedBy}
            />
          </View>
        </Card.Content>
        <Card.Actions>
          <View style={{ flex: 1, marginLeft: 100, marginRight: 100 }}>
            <Button
              mode="contained"
              colour="purple"
              onPress={() => navigation.navigate("Event Details", {})}
            >
              Request Invite
            </Button>
          </View>
        </Card.Actions>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  eventCard: {},
  eventView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  attendeeList: {
    justifyContent: "center",
    alignItems: "center",
  },
  request: {},
});

export default EventDetails;
