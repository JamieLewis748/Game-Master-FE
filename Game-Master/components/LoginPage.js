import React, { useState } from "react";
import { SafeAreaView, TextInput, Button, Alert } from "react-native";

function LoginPage({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      navigation.navigate("Home");
    }
  };

  const handleEventLog = () => {
    navigation.navigate("Events");
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", padding: 16 }}>
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
      <Button title="Login" onPress={handleLogin} />
      <Button title="See events" onPress={handleEventLog} />
    </SafeAreaView>
  );
}

export default LoginPage;
