import React from "react";
import { Paragraph, IconButton } from "react-native-paper";
import { Pressable, View, Text } from "react-native";
import approveRequest from "../APIs/approveRequest";

const RequestedParticipantInfo = ({ userList, requestedToParticipate, event_id, setEventParticipants, setRequestedParticipants }) => {
    let users = []
    if (userList.length > 0 && requestedToParticipate !== undefined) {
        users = requestedToParticipate.map((participantId) =>
            userList.find((user) => user._id === participantId)
        );
    }

    function acceptParticipantWhoRequested(user_id) {
        approveRequest(event_id, user_id)
        setEventParticipants((otherParticipants) => [...otherParticipants, user_id])

        setRequestedParticipants((otherRequestedParticipants) => [...otherRequestedParticipants.filter((requested) => {
            requested === user_id
        })])
    }

    return (
        <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <IconButton icon="account-circle" size={16} color="gray" />
                <Paragraph style={{ fontWeight: "bold" }}>
                    Requested to participate:
                </Paragraph>
            </View>
            {users &&
                users.map((user, index) => (
                    <Paragraph style={{ marginLeft: 30 }} key={index}>
                        {"\u2022 "}
                        {user.username}
                        <Pressable onPress={() => acceptParticipantWhoRequested(user._id)}>
                            <Text>Accept</Text>
                        </Pressable>
                    </Paragraph>

                ))}
        </View>
    );
};

export default RequestedParticipantInfo;
