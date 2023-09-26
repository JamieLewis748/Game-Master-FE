import React, { useState, useEffect, useContext } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { WatchListContext } from "../Context/WatchListContext";

const axiosBase = axios.create({
  baseURL: "https://game-master-be.onrender.com/api/",
});

const fetchEvents = () => axiosBase.get("events");

const WatchList = ({ watchList }) => {
  const [currentWatchList, setCurrentWatchList] = useState([]);
  const navigation = useNavigation();
  const { WatchListChanged, setWatchListChanged } = useContext(WatchListContext);

  useEffect(() => {
    setWatchListChanged(false)
    fetchEvents()
      .then(({ data }) => {
        const watchListFilter = data.filter((event) =>
          watchList.includes(event._id)
        );
        setCurrentWatchList(watchListFilter);
      })
      .catch((err) => {
        console.error("Error fetching events: ", err);
      });
  }, [watchList, WatchListChanged]);

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
    const scale = new Animated.Value(1);

    return (
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate("Events", {
            screen: "Event Details",
            params: {
              selectedEvent: event,
            },
          })
        }
      >
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
          </Card>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  const renderItem = ({ item }) => <EventItem event={item} />;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={currentWatchList}
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
export default WatchList;
