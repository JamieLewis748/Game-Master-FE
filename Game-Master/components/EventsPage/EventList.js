import React, { useState, useEffect } from "react";
import { FlatList, Image, StyleSheet, View, Animated, TouchableWithoutFeedback, Button, SafeAreaView, ScrollView } from "react-native";
import { Card, Paragraph, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../Context/UserContext";
import { Axios } from "axios";
const EventList = ({ currentEventList }) => {
const navigation = useNavigation()
  
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


  const handleWatchlist = () => {
          Axios.post("/api/events/:event_id/watchList", {
            user_id: UserContext,
          });
  }

  const handleCancel = () => {
    //make delete event func
  }

  const EventItem = ({ event }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const scale = new Animated.Value(1);

    return (
        <SafeAreaView>
          <TouchableWithoutFeedback onPress={() => setIsExpanded(!isExpanded)}>
            <Animated.View
              style={{ ...styles.container, transform: [{ scale }] }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
          >
    
              <Card style={styles.container}>
                <Paragraph style={styles.cardHeading}>
                  {event.gameInfo}
                </Paragraph>
                <View style={styles.eventInfoContainer}>
                  <Image
                    source={{ uri: event.image }}
                    style={styles.eventImage}
                  />
                  <View style={styles.infoContainer}>
                    <View style={styles.infoSubContainer}>
                      <Paragraph style={styles.infoSubParagraph}>
                        <IconButton icon="calendar" size={16} color="gray" />
                        {event.dateTime.toString().substring(0, 8)}
                      </Paragraph>
                      <Paragraph style={styles.infoSubParagraph}>
                        <IconButton
                          icon="account-group"
                          size={16}
                          color="gray"
                        />
                        {event.participants.length}/{event.capacity}
                      </Paragraph>
                      <Paragraph style={styles.infoSubParagraph}>
                        <IconButton icon="map-marker" size={16} color="gray" />
                        {/* {event.location} */} Location
                      </Paragraph>
                    </View>
                  </View>
                </View>
                <Card.Actions>
                  <View style={styles.buttonWrapper}>
                    {isExpanded && (
                      <View style={styles.cardButtons}>
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
                        ,
                        <Button
                          title="Watchlist"
                          mode="contained"
                          colour="purple"
                          onPress={() => handleWatchlist}
                          />
                        ,
                        {event.hostedBy === UserContext._id ? (
                          <Button
                          style={styles.cardButtons}
                          title="Cancel"
                          mode="contained"
                          colour="purple"
                          onPress={() => handleCancel}
                          />
                          ) : (
                            <></>
                            )}
                      </View>
                    )}
                  </View>
                </Card.Actions>
              </Card>
            </Animated.View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
    );
  };

  const renderItem = ({ item }) => <EventItem event={item} />;

  return (
    <SafeAreaView style={{ flex: 1 }}>   
        <FlatList
          data={currentEventList}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          numColumns={1}
        />
      </SafeAreaView>
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
  cardButtons: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 45,
    marginRight: 25,
    justifyContent: "space-evenly",
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: "center",
    marginLeft: 45,
    marginRight: 25,
  },
});


export default EventList;
