import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Button,
  View,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./Authentication/firebase-config";
import { UserContext, DbUserContext } from "./Context/UserContext";
import postNewUser from "./APIs/postUser";

const CreateAccount = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  async function handleSignUp() {
    try {
      const response = await postNewUser(
        fullName,
        username,
        registerEmail,
        imageUrl,
        characterName,
        registerPassword
      );
      if (response.acknowledged === true) {
        navigation.navigate("MainTabs", { screen: "Account" });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: "https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=740",
          }}
          style={styles.avatar}
        />
      </View>

      <View style={styles.card}>
        <Text style={{ fontSize: 20, alignSelf: "center" }}>
          Create An Account!
        </Text>
        <TextInput
          style={styles.inputbar}
          placeholder="Email:"
          onChangeText={setRegisterEmail}
          value={registerEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.inputbar}
          placeholder="Full Name:"
          onChangeText={setFullName}
          value={fullName}
        />
        <TextInput
          style={styles.inputbar}
          placeholder="Username:"
          onChangeText={setUsername}
          value={username}
        />

        <TextInput
          style={styles.inputbar}
          placeholder="Password:"
          onChangeText={setRegisterPassword}
          value={registerPassword}
        />
        <TextInput
          style={styles.inputbar}
          placeholder="Enter Image URL"
          onChangeText={setImageUrl}
          value={imageUrl}
        />
        <TextInput
          style={styles.inputbar}
          placeholder="Enter a character name:"
          onChangeText={setCharacterName}
          value={characterName}
        />
        <View style={styles.buttonContainer}>
          <Button title="Create Account" onPress={handleSignUp} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "purple",
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
  },
  inputbar: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },

  avatarContainer: {
    marginBottom: 10,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  buttonContainer: {
    marginTop: 10,
    width: 150,
    alignSelf: "center",
  },
});

export default CreateAccount;
