import React, { useState } from "react";
import { SafeAreaView, FlatList, Image, StyleSheet, View, Animated } from "react-native";
import { Text, Button, Card, Paragraph, Title, Avatar, IconButton } from "react-native-paper";
import { eventList } from "../assets/data/event.data";

const EventList = ({ navigation }) => {
  const [currentEventList, setcurrentEventList] = useState([]);

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
              <Paragraph>
                <IconButton icon="calendar" size={16} color="gray" />
                {event.date}{" "}
                <IconButton icon="clock-outline" size={16} color="gray" />
                {event.time}
              </Paragraph>
              <Paragraph>
                <IconButton icon="account-group" size={16} color="gray" />
                {event.capacity}
                <IconButton icon="map-marker" size={16} color="gray" />{" "}
                {event.location}
              </Paragraph>
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
    borderRadius: 10,
    justifyContent: "space-between",
  },

  eventInfoContainer: {
    flex: 1,
    flexDirection: "row",
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
