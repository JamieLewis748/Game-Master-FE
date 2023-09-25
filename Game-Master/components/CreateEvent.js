import React, { useState, useContext } from "react";
import { SafeAreaView, Text, TextInput, Button, StyleSheet, View, Switch, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import postNewEvent from './APIs/postEvent';
import { DbUserContext } from "./Context/UserContext";

const CreateEvent = ({ navigation }) => {
  const { dbUser, setDbUser } = useContext(DbUserContext);
  const [timeError, setTimeError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [capacityError, setCapacityError] = useState("");
  const [formError, setFormError] = useState("");
  const [dateError, setDateError] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  // const [durationError, setDurationError] = useState("");


  const [eventData, setEventData] = useState({
    host_id: dbUser._id,
    image: "",
    gameInfo: "",
    isGameFull: false,
    game_type: "Board Game",
    dateTime: "",
    duration: '2:00:00',
    capacity: "",
    participants: [dbUser._id],
    prizeCollection_id: "1",
  });

  const validateDate = (text) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(text)) {
      setDateError("Please enter a valid date in YYYY-MM-DD format");
    } else {
      setDateError("");
    }
  };

  // const validateDuration = (text) => {
  //   const durationRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  //   if (!durationRegex.test(text)) {
  //     setDurationError("Please enter a valid duration");
  //   } else {
  //     setDurationError("");
  //   }
  // };

  const validateTime = (text) => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(text)) {
      setTimeError("Please enter a valid time in HH:MM format");
    } else {
      setTimeError("");
    }
  };

  const validateLocation = (text) => {
    if (!text.trim()) {
      setLocationError("Location cannot be blank");
    } else {
      setLocationError("");
    }
  };

  const validateCapacity = (text) => {
    if (!/^\d+$/.test(text) && text !== "") {
      setCapacityError("Please enter a valid number for capacity");
    } else {
      setCapacityError("");
    }
  };

  const [modalVisible, setModalVisible] = useState(false);

  const handleCreateEvent = async () => {
    validateDate(date);
    validateTime(time);
    validateLocation(eventData.location);
    validateCapacity(eventData.capacity);
    // validateDuration(eventData.duration);


    if (dateError || timeError || locationError || capacityError) {
      setFormError("Please check the fields in red");
      setModalVisible(true);
      return;
    }
    try {
      const dateTime = `${date} ${time}`;
      console.log("🚀 ~ dateTime:", dateTime);
      const postResult = await postNewEvent({
        host_id: eventData.host_id,
        image: eventData.image,
        gameInfo: eventData.gameInfo,
        isGameFull: eventData.isGameFull,
        game_type: eventData.game_type,
        dateTime: dateTime,
        duration: eventData.duration,
        capacity: eventData.capacity,
        participants: eventData.participants,
        prizeCollection_id: eventData.prizeCollection_id
      });
      console.log(postResult.data);
      if (postResult.data.acknowledged === true) {
        eventData._id = postResult.data.insertedId;
        console.log("🚀 ~ postResult.data.insertedId:", postResult.data.insertedId);
        navigation.navigate("Event Details", {
          selectedEvent: eventData,
        });
      } else {
        setFormError("Failed to create event, please try again");
        setModalVisible(true);
      }
    } catch (err) {
      console.log(err);
      setFormError("Failed to create event, please try again");
      setModalVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
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
          style={[styles.input, locationError ? styles.errorInput : null,]}
          placeholder="Location"
          value={eventData.location}
          onChangeText={(text) => setEventData({ ...eventData, location: text })}
        />

        <TextInput
          style={styles.input}
          // durationError ? styles.errorInput : null
          placeholder="Time (HH:MM)"
          value={eventData.duration}
          onChangeText={(text) =>
            setEventData({ ...eventData, duration: text })
          }
        />


        <View style={styles.inputContainer}>
          <Text style={styles.label}>Event Date (YYYY-MM-DD)</Text>
          <TextInput
            style={[styles.input, dateError ? styles.errorInput : null]}
            placeholder="YYYY-MM-DD"
            value={date}
            onChangeText={setDate}
          />
        </View>


        <TextInput
          style={[styles.input, timeError ? styles.errorInput : null]}
          placeholder="Time (HH:MM)"
          value={time}
          onChangeText={(text) => {
            setTime(text);
          }
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Capacity (Number)"
          value={eventData.capacity}
          onChangeText={(text) => {
            setEventData({ ...eventData, capacity: text });
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text style={{ color: 'red', fontSize: 18 }}>{formError}</Text>
            <Button
              title="Close"
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>

      <View style={styles.submitButton}>
        <Button title="Create Event" onPress={handleCreateEvent} />
      </View>

    </SafeAreaView >
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
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },


});

export default CreateEvent;