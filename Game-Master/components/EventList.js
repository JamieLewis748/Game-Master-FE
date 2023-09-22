import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Animated,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import { Card, Paragraph, IconButton } from "react-native-paper";
import axios from "axios";

const axiosBase = axios.create({
  baseURL: "https://game-master-be.onrender.com/api/",
});

const fetchEvents = () => axiosBase.get("events");

const EventList = ({ navigation }) => {
  const [currentEventList, setCurrentEventList] = useState([]);

  useEffect(() => {
    fetchEvents()
      .then(({ data }) => {
        setCurrentEventList(data);
      })
      .catch((err) => {
        console.error("Error fetching events: ", err);
      });
  }, []);

  const handleMouseEnter = () => {
    // Animated.spring(Scale, {
    //   toValue: 1.05,
    //   friction: 3,
    //   useNativeDriver: false,
    // }).start();
  };

  const handleMouseLeave = () => {
    // Animated.spring(Scale, {
    //   toValue: 1,
    //   friction: 3,
    //   useNativeDriver: false,
    // }).start();
  };

  const EventItem = ({ event }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const scale = new Animated.Value(1);

    return (
      <TouchableWithoutFeedback onPress={() => setIsExpanded(!isExpanded)}>
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
                  {event.dateTime}
                  <IconButton icon="clock-outline" size={16} color="gray" />
                  {event.duration}
                </Paragraph>
                <Paragraph>
                  <IconButton icon="account-group" size={16} color="gray" />
                  {event.capacity}
                  <IconButton icon="map-marker" size={16} color="gray" />
                  {/* {event.location} */} Needs to be added to event object
                </Paragraph>
              </View>
            </View>
            <Card.Actions>
              {isExpanded && (
                <Button
                  title="See event"
                  mode="contained"
                  colour="purple"
                  onPress={() =>
                    navigation.navigate("Event Details", {
                      selectedEvent: event,
                    })
                  }
                />
              )}
            </Card.Actions>
          </Card>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  const renderItem = ({ item }) => <EventItem event={item} />;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={currentEventList}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
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
