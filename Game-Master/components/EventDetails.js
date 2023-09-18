import { SafeAreaView, FlatList, Image, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import {
  Text,
  Button,
  Card,
  Paragraph,
  Title,
  Avatar,
  IconButton
} from "react-native-paper";

const EventDetails = ({route}) => {

  const {selectedEvent} = route.params

  return (
    <Card >
      <Card.Content>
        <Card.Cover source={{ uri: selectedEvent.image }} />
        <Title>{selectedEvent.game_type}</Title>
        <View > 
          <IconButton name='clock-outline' size={10} color='grey' /><Paragraph><Paragraph style={{fontWeight: 'bold'}} >Time: </Paragraph>{selectedEvent.time}</Paragraph>
        </View>
        <Paragraph><Paragraph style={{fontWeight: 'bold'}} >Date: </Paragraph>{selectedEvent.date}</Paragraph>
        <Paragraph><Paragraph style={{fontWeight: 'bold'}} >Capacity: </Paragraph> {selectedEvent.capacity}</Paragraph>
        <Paragraph><Paragraph style={{fontWeight: 'bold'}} >Public: </Paragraph> {selectedEvent.public ? 'Public Event' : 'Private Event'}</Paragraph>
        <Paragraph style={{ fontWeight: "bold" }}>Currently attending:</Paragraph>
              {selectedEvent.current_attending.map((player, index) => (
                <Paragraph key={index}>{player}</Paragraph>
              ))}
        <Paragraph><Paragraph style={{fontWeight: 'bold'}} >Description: </Paragraph> {selectedEvent.description}</Paragraph>
      </Card.Content>
      <Card.Actions>
          <Button
            mode="contained"
            colour="purple"
            onPress={() => navigation.navigate("Event Details", {  })}
          >
            Request attendance for game
          </Button>
        </Card.Actions>
    </Card>
  );
};

export default EventDetails;
