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

const EventDetails = ({ route }) => {
  const { selectedEvent } = route.params;
  console.log(selectedEvent);

  return (
    <Card>
      <Card.Content>
        <Card.Cover source={{ uri: selectedEvent.image }} />
        <Title>{selectedEvent.game_type}</Title>
        <DateInfo date={selectedEvent.date} />
        <CapacityInfo capacity={selectedEvent.capacity} />
        <PublicInfo publc={selectedEvent.public} />
        <AttendeesInfo attendees={selectedEvent.current_attending} />
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

export default EventDetails;
