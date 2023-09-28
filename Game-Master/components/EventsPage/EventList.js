import React, { useState, useEffect, useContext } from "react";
import { FlatList, Image, StyleSheet, View, Animated, SafeAreaView, ScrollView, Pressable, Text } from "react-native";
import { Card, Paragraph, IconButton} from "react-native-paper";
import { DbUserContext } from "../Context/UserContext";
import modifyWatchList from "../APIs/modifyWatchList";
import cancelEvent from "../APIs/handleEventCancel";
import { useNavigation } from "@react-navigation/native";
import { WatchListContext } from "../Context/WatchListContext";

const EventList = ({ currentEventList }) => {
  const {watchList, setWatchList} = useContext(WatchListContext)
  const { dbUser, setDbUser } = useContext(DbUserContext);
  const [optimisticWatchList, setOptimisticWatchList] = useState([]);
  const navigation = useNavigation()
  
  useEffect(() => {
    setOptimisticWatchList(dbUser.watchList);
  }, [dbUser]);
  
  const handleWatchlist = (event) => {
    if (optimisticWatchList.includes(event._id)) {
      const updatedOptimistic = optimisticWatchList.filter(
        (eachEvent) => eachEvent !== event._id
      );
      setOptimisticWatchList(updatedOptimistic)
    } else {
      const addToOptimistic = [...optimisticWatchList, event._id]
      setOptimisticWatchList(addToOptimistic)
    }
    modifyWatchList(dbUser._id, event._id, setWatchList, watchList)
  };

  
  const handleCancel = (event) => {
    cancelEvent(dbUser._id, event._id);
  };

  const EventItem = ({ event }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const scale = new Animated.Value(1);

    return (
      <SafeAreaView>
        <Pressable onPress={() => setIsExpanded(!isExpanded)}>
          <Card style={styles.container}>
            <Paragraph style={styles.cardHeading}>{event.gameInfo}</Paragraph>
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
                    source={require(`../../assets/gameType/${
                      event.gameType.split(" ")[0]
                    }.jpg`)}
                    style={styles.eventImage}
                  />
                </>
              )}
              <View style={styles.infoContainer}>
                <View style={styles.infoSubContainer}>
                  <Paragraph style={styles.infoSubParagraph}>
                    <IconButton icon="calendar" size={16} color="gray" />
                    {event.dateTime.toString().substring(0, 8)}
                  </Paragraph>
                  <Paragraph style={styles.infoSubParagraph}>
                    <IconButton icon="account-group" size={16} color="gray" />
                    {event.participants.length}/{event.capacity}
                  </Paragraph>
                  <Paragraph style={styles.infoSubParagraph}>
                    <IconButton icon="clock-outline" size={16} color="gray" />
                    {event.dateTime.toString().substring(9, 14)}
                  </Paragraph>
                </View>
              </View>
            </View>
            <Card.Actions>
              {isExpanded && (
                <>
                  <View
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      width: 2000,
                    }}
                  >
                    <Pressable
                      title="See event"
                      mode="contained"
                      style={styles.cardButtons}
                      onPress={() => {
                        if (dbUser._id === event.hostedBy) {
                          navigation.navigate("My Event", {
                            selectedEvent: event,
                          });
                        } else {
                          navigation.navigate("Event Details", {
                            selectedEvent: event,
                          });
                        }
                      }}
                    >
                      <Text style={{ color: "white", fontSize: 16 }}>
                        See event
                      </Text>
                    </Pressable>
                    {optimisticWatchList.includes(event._id) ? (
                      <Pressable
                        title="Watchlist"
                        mode="contained"
                        style={styles.cardButtons}
                        onPress={() => handleWatchlist(event)}
                      >
                        <Text style={{ color: "white", fontSize: 16 }}>
                          Remove Watchlist
                        </Text>
                      </Pressable>
                    ) : (
                      <Pressable
                        title="Watchlist"
                        mode="contained"
                        style={styles.cardButtons}
                        onPress={() => handleWatchlist(event)}
                      >
                        <Text style={{ color: "white", fontSize: 16 }}>
                          Add Watchlist
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </>
              )}
            </Card.Actions>
          </Card>
        </Pressable>
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    marginLeft: 6,
    marginRight: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "purple"
  },
});
export default EventList;