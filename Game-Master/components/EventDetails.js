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

const EventDetails = ({ route }) => {
  console.log(route.params)
  const { selectedEvent } = route.params;

  return (
    <Card>
      <Card.Content style={styles.eventCard}>
        <Card.Cover source={{ uri: selectedEvent.image }} />
        <Title>{selectedEvent.game_type}</Title>
        <View style={styles.eventView}>
          <TimeInfo time={selectedEvent.time} />
          <DateInfo date={selectedEvent.date} />
        </View>
        <View style={styles.eventView}>
          <CapacityInfo capacity={selectedEvent.capacity} />
          <PublicInfo public={selectedEvent.public} />
        </View>
        <View styles={styles.attendeeList}>
          <AttendeesInfo attendees={selectedEvent.current_attending} />
        </View>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          colour="purple"
          onPress={() => navigation.navigate("Event Details", {})}
        >
          Request attendance for game
        </Button>
      </Card.Actions>
    </Card>
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
});

export default EventDetails;
