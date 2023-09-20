import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  View,
  Image,
} from "react-native";

function LoginPage({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      navigation.navigate("Home");
    }
  };

  const handleEventLog = () => {
    navigation.navigate("MainTabs", { screen: "Events" });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "space-evenly", padding: 16 }}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.logo}
          source="https://www.designevo.com/res/templates/thumb_small/banner-board-jungle-logo.webp"
        />
      </View>
      <View>
        <TextInput
          style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={styles.button}>
          <Button title="Login" onPress={handleLogin} />
        </View>
        <View style={styles.button}>
          <Button title="See events" onPress={handleEventLog} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 20,
  },
  logo: {
    height: 250,
    width: 250,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginPage;
