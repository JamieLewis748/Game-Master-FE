import {
    SafeAreaView,
    FlatList,
    Image,
    StyleSheet,
    View,
    ScrollView,
    Pressable,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";

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
import RequestedParticipantInfo from "./EventDetails-Components/RequestedParticipantsInfo";
import TimeInfo from "./EventDetails-Components/TimeInfo";
import DescriptionInfo from "./EventDetails-Components/DescriptionInfo";
import axios from "axios";
import completeEvent from "./APIs/completeEvent";


const axiosBase = axios.create({
    baseURL: "https://game-master-be.onrender.com/api/",
});

const fetchUsers = () => axiosBase.get("users");

const MyEventPage = ({ route }) => {
    const [userList, setUserList] = useState([])

    const { selectedEvent } = route.params;
    console.log(selectedEvent)

    useEffect(() => {
        fetchUsers()
            .then(({ data }) => {
                setUserList(data);
            })
            .catch((err) => {
                console.error("Error fetching events: ", err);
            });
    }, []);

    return (
        <ScrollView>
            <SafeAreaView
                style={{
                    backgroundColor: "purple",
                    height: "100%",
                    overflow: "hidden",
                }}
            >
                <Card
                    style={{
                        margin: "auto",
                        height: "97%",
                        marginTop: 10,
                    }}
                >
                    <Card.Content style={styles.eventCard}>
                        <Card.Cover source={{ uri: selectedEvent.image }} />
                        <View>
                            <DescriptionInfo gameInfo={selectedEvent.gameInfo} />
                        </View>
                        <View style={styles.eventView}>
                            <TimeInfo time={selectedEvent.dateTime} />
                            <DateInfo date={selectedEvent.dateTime} />
                        </View>
                        <View style={styles.eventView}>
                            <CapacityInfo
                                capacity={selectedEvent.capacity}
                                participants={selectedEvent.participants.length}
                            />
                            <PublicInfo public={selectedEvent.public} />
                        </View>
                        <View styles={styles.attendeeList}>
                            {userList.length > 0 && (
                                <AttendeesInfo
                                    userList={userList}
                                    host={selectedEvent.hostedBy}
                                    participants={selectedEvent.participants}
                                />
                            )}
                        </View>
                        <View styles={styles.attendeeList}>
                            {userList.length > 0 && (
                                <RequestedParticipantInfo
                                    userList={userList}
                                    requestedToParticipate={selectedEvent.requestedToParticipate}
                                    event_id={selectedEvent._id}
                                />
                            )}
                        </View>
                        <View styles={styles.attendeeList}>
                            {selectedEvent.isCompleted === "false" ? (
                                <Pressable onPress={() => completeEvent(selectedEvent._id, selectedEvent.hostedBy,selectedEvent.participants, selectedEvent.participants[0])}><Text>Complete Event</Text></Pressable>
                            ) : (
                                <Text>This event is already completed</Text>
                            )}
                        </View>
                    </Card.Content>
                    <Card.Actions>
                        <View
                            style={{
                                flex: 1,
                                marginTop: 40,
                                marginLeft: 100,
                                marginRight: 100,
                                marginBottom: 100,
                            }}
                        >
                            {/* <Button
                                mode="contained"
                                colour="purple"
                                onPress={() => navigation.navigate("Event Details", {})}
                            >
                                Request Invite
                            </Button> */}
                        </View>
                    </Card.Actions>
                </Card>
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    eventCard: {},
    eventView: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default MyEventPage;