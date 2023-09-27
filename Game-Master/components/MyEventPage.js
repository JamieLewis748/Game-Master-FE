import {
    SafeAreaView,
    FlatList,
    Image,
    StyleSheet,
    View,
    ScrollView,
    Pressable,
    Modal,
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
import MonsterImageSelection from "./CreateEvent-Components/MonsterImageSelect";
import { Picker } from "@react-native-picker/picker";


const axiosBase = axios.create({
    baseURL: "https://game-master-be.onrender.com/api/",
});

const fetchUsers = () => axiosBase.get("users");


const MyEventPage = ({ route }) => {
    const { selectedEvent } = route.params;
    const [userList, setUserList] = useState([]);
    const [selectedWinner, setSelectedWinner] = useState("");
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [eventParticipants, setEventParticipants] = useState(selectedEvent.participants);
    const [requestedParticipants, setRequestedParticipants] = useState(selectedEvent.requestedToParticipate);

    const handleCompleteEvent = () => {
        if (!selectedWinner) {
            setShowWarningModal(true);
        } else {
            completeEvent(selectedEvent._id, selectedEvent.hostedBy, selectedEvent.participants, selectedWinner._id);
        }
    };

    const updateParticipants = (user_id) => {
        setEventParticipants((prevParticipants) => [...prevParticipants, user_id]);

        setRequestedParticipants((prevParticipants) =>
            prevParticipants.filter((id) => id !== user_id)
        );
    };

    function getUsernameFromId(userId) {
        const user = userList.find((user) => user._id === userId);
        return user ? user.username : 'Unknown User';
    }

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
                                    participants={eventParticipants}
                                />
                            )}
                        </View>
                        <View styles={styles.attendeeList}>
                            {userList.length > 0 && (
                                <RequestedParticipantInfo
                                    userList={userList}
                                    requestedToParticipate={requestedParticipants}
                                    event_id={selectedEvent._id}
                                    onUpdateParticipants={updateParticipants}
                                />
                            )}
                        </View>
                        <View style={styles.attendeeList}>
                            {console.log("🚀 ~ participants:", selectedEvent.participants)}
                            {userList.length > 0 && (

                                < Picker
                                    selectedValue={selectedWinner}
                                    onValueChange={(itemValue, itemIndex) => {
                                        const selectedWinnerIndex = parseInt(itemValue);
                                        const selectedWinner = selectedEvent.participants[selectedWinnerIndex];
                                        console.log('Selected Winner:', selectedWinner);
                                        setSelectedWinner(selectedWinner);

                                    }}
                                >
                                    <Picker.Item label="Select a Winner" value={null} />
                                    {selectedEvent.participants.map((participant, index) => (
                                        <Picker.Item
                                            key={index.toString()}
                                            label={getUsernameFromId(participant)}
                                            value={participant}
                                        />
                                    ))}
                                </Picker>
                            )}
                        </View>
                        <View styles={styles.attendeeList}>
                            {selectedEvent.isCompleted === "false" ? (
                                <Pressable onPress={() => handleCompleteEvent}><Text>Complete Event</Text></Pressable>
                            ) : (
                                <Text>This event is already completed</Text>
                            )}
                        </View>;
                    </Card.Content>
                    <View >
                        <Text>Event Prize:</Text>
                        <MonsterImageSelection collectionId={selectedEvent.prizeCollection_id} />
                    </View>
                </Card>
                <Modal
                    visible={showWarningModal}
                    onRequestClose={() => setShowWarningModal(false)}
                >
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text>Please select a winner before completing the event.</Text>
                        <Button onPress={() => setShowWarningModal(false)}>OK</Button>
                    </View>
                </Modal>
            </SafeAreaView>
        </ScrollView >
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