import React, { useState, useContext } from "react";
import { SafeAreaView, Text, TextInput, Button, StyleSheet, View, Switch } from "react-native";
import { Picker } from "@react-native-picker/picker";
import postNewEvent from './APIs/postEvent'
import { DbUserContext } from "./Context/UserContext";

const CreateEvent = ({ navigation }) => {
  const { dbUser, setDbUser } = useContext(DbUserContext)

  const [eventData, setEventData] = useState({
    host_id: "1",
    image: "",
    gameInfo: "",
    isGameFull: false,
    game_type: "Board Game",
    dateTime: "",
    duration: '2:00:00',
    capacity: "",
    prizeCollection_id: "1",
  });

  const handleCreateEvent = async () => {
    try {
      const postResult = await PostNewUser(eventData, setDbUser)
      if (postResult.acknowledged === true) {
        eventData._id = postResult.data.insertedId
        navigation.navigate("Event Details", {
          selectedEvent: eventData,
        })
      }
    }
    catch (err) {

    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        {/* <Text>Create Event</Text> */}

        <View style={styles.inputContainer}>
          <Text >Game Type</Text>
          <Picker
            selectedValue={eventData.game_type}
            style={styles.picker}
            onValueChange={(itemValue) =>
              setEventData({ ...eventData, game_type: itemValue })
            }
          >
            <Picker.Item label="Board Game" value="Board Game" />
            <Picker.Item label="Card Game" value="Card Game" />
            <Picker.Item label="RPG" value="RPG" />
            <Picker.Item label="Tabletop Game" value="Tabletop Game" />
            <Picker.Item label="Video Game" value="Video Game" />
          </Picker>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={eventData.location}
          onChangeText={(text) =>
            setEventData({ ...eventData, location: text })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Time (HH:MM)"
          value={eventData.duration}
          onChangeText={(text) =>
            setEventData({ ...eventData, duration: text })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="dateTime"
          value={eventData.dateTime}
          onChangeText={(text) =>
            setEventData({ ...eventData, dateTime: text })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Capacity (Number)"
          value={eventData.capacity}
          onChangeText={(text) => {
            if (/^\d+$/.test(text) || text === "") {
              setEventData({ ...eventData, capacity: text });
            }
          }}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Prize"
          value={eventData.prizeCollection_id}
          onChangeText={(text) =>
            setEventData({ ...eventData, prizeCollection_id: text })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Description"
          value={eventData.gameInfo}
          onChangeText={(text) =>
            setEventData({ ...eventData, gameInfo: text })
          }
        />

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Public Event</Text>
          <Switch
            value={eventData.public}
            onValueChange={(value) =>
              setEventData({ ...eventData, public: value })
            }
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Image URL"
          value={eventData.image}
          onChangeText={(text) =>
            setEventData({ ...eventData, image: text })
          }
        />
        <View style={styles.imageContainer}>
          {/* <Image /> */}
        </View>
      </View>

      <View style={styles.submitButton}>
        <Button title="Create Event" onPress={handleCreateEvent} />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  // input: {
  //   width: "80%",
  //   height: 40,
  //   borderColor: "gray",
  //   borderWidth: 1,
  //   marginVertical: 10,
  //   paddingLeft: 10,
  // },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
  },
  picker: {
    width: '50%',
    marginLeft: 10,
  },
  submitButton: {
    marginTop: 20,
  },
  imageContainer: {
    height: 200,
    width: 200,
    backgroundColor: "#ccc"
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },


});

export default CreateEvent;