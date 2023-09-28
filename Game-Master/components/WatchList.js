import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
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
import DateInfo from "./EventDetails-Components/DateInfo";
import TimeInfo from "./EventDetails-Components/TimeInfo";

const axiosBase = axios.create({
  baseURL: "https://game-master-be.onrender.com/api/",
});

const fetchEvents = () => axiosBase.get("events");

const WatchList = ({ watchList }) => {
  const [currentWatchList, setCurrentWatchList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
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
  }, [watchList]);

  const handleMouseEnter = () => {
    // Animated.spring(Scale, {
    //   toValue: 1.05,
    //   friction: 3,
    //   useNativeDriver: false,
    // }).start();;
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
            <Paragraph style={styles.cardHeading}>
              {event.gameInfo || "Event Info"}
            </Paragraph>
            <View style={styles.eventInfoContainer}>
            {event.image ? (
                <>
                  <Image
                    source={{ uri: event.image }}
                    style={styles.eventImage}
                  />
                </>
              ) : (
                <>
                  <Image
                    source={require(`../assets/gameType/${
                      event.gameType.split(" ")[0]
                    }.jpg`)}
                    style={styles.eventImage}
                  />
                </>
              )}
              <View style={styles.infoContainer}>
                <View style={styles.infoSubContainer}>
                  <Paragraph>
                    <DateInfo date={event.dateTime} />
                  </Paragraph>
                  <Paragraph style={styles.infoSubParagraph}>
                    <IconButton icon="account-group" size={16} color="gray" />
                    {event.participants.length}/{event.capacity}
                  </Paragraph>
                  <Paragraph style={styles.infoSubParagraph}>
                    <TimeInfo time={event.dateTime} />
                  </Paragraph>
                </View>
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
      {currentWatchList.length === 0 ? (
        <Card style={styles.placeholderCard}>
          <Text style={{ color: "white" }}>
            Your watch list will be displayed here
          </Text>
        </Card>
      ) : (
        <FlatList
          data={currentWatchList}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          numColumns={1}
        />
      )}
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
    width: 130,
    height: 130,
    marginRight: 10,
    marginTop: 15,
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "black",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  infoSubContainer: {
    flex: 1,
    flexDirection: "column",
  },
  cardHeading: {
    fontSize: 18,
    marginLeft: 8,
  },
  placeholderCard: {
    height: 100,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default WatchList;
