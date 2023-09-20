import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  View,
  Image,
  Text,
} from "react-native";

function LoginPage({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      navigation.navigate("Account");
    }
  };

  const handleEventLog = () => {
    navigation.navigate("MainTabs", { screen: "Events" });
  };

  const handleSignUp = () => {
    navigation.navigate("Create Account");
  };

  const handleCreateEvent = () => {
    navigation.navigate("Create Event");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        {/* <Image
          style={styles.logo}
          source="https://www.designevo.com/res/templates/thumb_small/banner-board-jungle-logo.webp"
        /> */}
      </View>
      <View style={styles.card}>
        <Text style={{ fontSize: 20, alignSelf: "center", marginBottom: 5 }}>
          Login
        </Text>
        <TextInput
          style={styles.inputbar}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.inputbar}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={handleLogin} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Create Account" onPress={handleSignUp} />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="See events" onPress={handleEventLog} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Create Event" onPress={handleCreateEvent} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "90%",
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

  logoContainer: {
    marginBottom: 10,
  },

  logo: {
    width: 200,
    height: 200,
    borderRadius: 50,
  },

  buttonContainer: {
    marginTop: 10,
    width: 150,
    alignSelf: "center",
  },
});

export default LoginPage;
