
import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  View,
  Switch,
  ScrollView,
  Modal, 
  Image
} from "react-native";


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
  const [selectedGameType, setSelectedGameType] = useState('');

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
            onValueChange={(itemValue) => {
              setEventData({ ...eventData, game_type: itemValue });
              setSelectedGameType(itemValue);
            }}
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


          <TextInput
            style={styles.input}
            placeholder="Description"
            value={eventData.description}
            onChangeText={(text) =>
              setEventData({ ...eventData, description: text })
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
          {selectedGameType === 'Board Game' && (
            <Image
              source={{ uri: 'https://media.timeout.com/images/105627949/image.jpg' }}
              style={{ width: 200, height: 200 }}
            />
          )}
          {selectedGameType === 'Card Game' && (
            <Image
              source={{ uri: 'https://www.thesprucecrafts.com/thmb/fn4eXykxus96RvTdCdY2mDIerB0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/queen-of-hearts-182147242-467e848b1c764421bb699a027648b972.jpg' }}
              style={{ width: 200, height: 200 }}
            />
          )}
          {selectedGameType === 'Tabletop Game' && (
            <Image
              source={{ uri: 'https://emsw9w6wsq2.exactdn.com/wp-content/uploads/2022/05/wargame-table-face-off.jpg?strip=all&lossy=1&resize=800%2C536&ssl=1' }}
              style={{ width: 200, height: 200 }}
            />
          )}
          {selectedGameType === 'RPG' && (
            <Image
              source={{ uri: 'https://cdn.vox-cdn.com/thumbor/R9UVrC1X6phoW8Dqwpf8gqENqlc=/0x0:4288x2848/1200x800/filters:focal(1819x763:2505x1449)/cdn.vox-cdn.com/uploads/chorus_image/image/66601351/165224970.jpg.0.jpg' }}
              style={{ width: 200, height: 200 }}
            />
          )}
          {selectedGameType === 'Video Game' && (
            <Image
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsmYbJbeMWssW-KyqKPTGJTEU_6BdCWrOKfg&usqp=CAU' }}
              style={{ width: 200, height: 200 }}
            />
          )}
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
            onChangeText={(text) => setEventData({ ...eventData, image: text })}
          />
          <View style={styles.imageContainer}>{/* <Image /> */}</View>
        </View>


    </SafeAreaView >
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
    justifyContent: "space-between",
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
    width: "50%",
    marginLeft: 10,
  },
  submitButton: {
    marginTop: 20,
  },
  imageContainer: {
    height: 200,
    width: 200,
    backgroundColor: "#ccc",
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
