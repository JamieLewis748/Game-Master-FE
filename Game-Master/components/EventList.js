import React, { useState } from "react";
import { SafeAreaView, FlatList, Image, StyleSheet, View } from "react-native";
import {
  Text,
  Button,
  Card,
  Paragraph,
  Title,
  Avatar,
} from "react-native-paper";

const EventList = ({ navigation }) => {
  const [currentEventList, setcurrentEventList] = useState([]);
  const eventList = [
    {
      event_id: "1",
      host_id: "1",
      image: "https://media.timeout.com/images/105627949/750/422/image.jpg",
      public: true,
      game_type: "boardgame",
      location: "locationdata",
      time: 10,
      date: "01/01/01",
      capacity: "full",
      current_attending: ["user1", "user2", "user3"],
      prize: `https://img.itch.zone/aW1nLzEzMzIzNDA0LmdpZg==/original/QUoq1B.gif`,
      description: "Looking for fellow Monopoly lovers for a weekly session. All experiences levels welcome "
    },

    {
      event_id: "2",
      host_id: "2",
      public: false,
      game_type: "cardgame",
      location: "locationdata",
      time: 11,
      date: "02/01/01",
      capacity: "3/5",
      prize: `https://img.itch.zone/aW1nLzEzMzIzMzkzLmdpZg==/original/A7JFLC.gif`,
      description: "Looking for fellow Monopoly lovers for a weekly session. All experiences levels welcome "
    },

    {
      event_id: "3",
      host_id: "2",
      public: false,
      game_type: "cardgame",
      location: "locationdata",
      time: 11,
      date: "02/01/01",
      capacity: "3/5",
      prize: `https://img.itch.zone/aW1nLzEzMzIzMzkzLmdpZg==/original/A7JFLC.gif`,
      description: "Looking for fellow Monopoly lovers for a weekly session. All experiences levels welcome "
    },

    {
      event_id: "4",
      host_id: "2",
      public: false,
      game_type: "cardgame",
      location: "locationdata",
      time: 11,
      date: "02/01/01",
      capacity: "3/5",
      prize: `https://img.itch.zone/aW1nLzEzMzIzMzkzLmdpZg==/original/A7JFLC.gif`,
      description: "Looking for fellow Monopoly lovers for a weekly session. All experiences levels welcome "
    },

    {
      event_id: "5",
      host_id: "2",
      public: false,
      game_type: "cardgame",
      location: "locationdata",
      time: 11,
      date: "02/01/01",
      capacity: "3/5",
      prize: `https://img.itch.zone/aW1nLzEzMzIzMzkzLmdpZg==/original/A7JFLC.gif`,
      description: "Looking for fellow Monopoly lovers for a weekly session. All experiences levels welcome "
    },

    {
      event_id: "6",
      host_id: "2",
      public: false,
      game_type: "cardgame",
      location: "locationdata",
      time: 11,
      date: "02/01/01",
      capacity: "3/5",
      prize: `https://img.itch.zone/aW1nLzEzMzIzMzkzLmdpZg==/original/A7JFLC.gif`,
      description: "Looking for fellow Monopoly lovers for a weekly session. All experiences levels welcome "
    },

    {
      event_id: "7",
      host_id: "2",
      public: false,
      game_type: "cardgame",
      location: "locationdata",
      time: 11,
      date: "02/01/01",
      capacity: "3/5",
      prize: `https://img.itch.zone/aW1nLzEzMzIzMzkzLmdpZg==/original/A7JFLC.gif`,
      description: "Looking for fellow Monopoly lovers for a weekly session. All experiences levels welcome "
    },
  ];

  const LeftContent = (props) => (
    <Avatar.Icon {...props} icon="cards-playing" />
  );

  const EventItem = ({ event }) => {
    return (
      <Card style={styles.container}>
        <Card.Title
          title={`Game Type: ${event.game_type}`}
          subtitle={`Location: ${event.location}`}
          left={LeftContent}
        />
        <Card.Content>
          <Card.Cover source={{ uri: event.image }} />
          <Paragraph>Time: {event.time}</Paragraph>
          <Paragraph>Date: {event.date}</Paragraph>
          <Paragraph>Capacity: {event.capacity}</Paragraph>
        </Card.Content>

        <Card.Actions>
          <Button
            mode="contained"
            colour="purple"
            onPress={() => navigation.navigate("Event Details", { selectedEvent: event })}
          >
            See event
          </Button>
        </Card.Actions>
      </Card>
    );
  };

  const renderItem = ({ item }) => <EventItem event={item} />;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={eventList}
        renderItem={renderItem}
        keyExtractor={(item) => item.event_id}
        numColumns={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 1,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    justifyContent: "center",
    backgroundColor: "orange",
    borderRadius: 10,
  },
});
export default EventList;
/* <View>
              <Text style={{ fontWeight: "bold" }}>Currently attending:</Text>
              {event.current_attending.map((player, index) => (
                <Text key={index}>{player}</Text>
              ))}
            </View>
          </Text> */
