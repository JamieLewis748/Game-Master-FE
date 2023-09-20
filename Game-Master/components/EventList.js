import React, { useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  View,
  Animated,
} from "react-native";
import {
  Text,
  Button,
  Card,
  Paragraph,
  Title,
  Avatar,
  IconButton,
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
      description:
        "Looking for fellow Monopoly lovers for a weekly session. All experiences levels welcome ",
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
      description:
        "Looking for fellow Monopoly lovers for a weekly session. All experiences levels welcome ",
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
      description:
        "Looking for fellow Monopoly lovers for a weekly session. All experiences levels welcome ",
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
      description:
        "Looking for fellow Monopoly lovers for a weekly session. All experiences levels welcome ",
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
      description:
        "Looking for fellow Monopoly lovers for a weekly session. All experiences levels welcome ",
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
      description:
        "Looking for fellow Monopoly lovers for a weekly session. All experiences levels welcome ",
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
      description:
        "Looking for fellow Monopoly lovers for a weekly session. All experiences levels welcome ",
    },
  ];

  const LeftContent = () => <IconButton size={20} icon="cards-playing" />;

  const EventItem = ({ event }) => {
    const scale = new Animated.Value(1);

    const handleMouseEnter = () => {
      Animated.spring(scale, {
        toValue: 1.05,
        friction: 3,
        useNativeDriver: true,
      }).start();
    };

    const handleMouseLeave = () => {
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View
        style={{ ...styles.container, transform: [{ scale }] }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Card style={styles.container}>
          <View style={styles.eventInfoContainer}>
            <Image source={{ uri: event.image }} style={styles.eventImage} />
            <View style={styles.infoContainer}>
              <Paragraph>Location: {event.location}</Paragraph>
              <Paragraph>Time: {event.time}</Paragraph>
              <Paragraph>Date: {event.date}</Paragraph>
              <Paragraph>Capacity: {event.capacity}</Paragraph>
            </View>
          </View>

          <Card.Actions>
            {/* <Button
            mode="contained"
            colour="purple"
            onPress={() =>
              navigation.navigate("Event Details", { selectedEvent: event })
            }
          >
            See event
          </Button> */}
          </Card.Actions>
        </Card>
      </Animated.View>
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
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "space-between",
  },

  eventInfoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  eventImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginTop: 15,
    marginLeft: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "black",
  },

  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
export default EventList;
