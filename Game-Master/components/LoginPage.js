import React, { useState, useContext, useEffect } from "react";
import {
  SafeAreaView,
  TextInput,
  Alert,
  StyleSheet,
  View,
  Image,
  Text,
} from "react-native";
import { Button } from "react-native-paper";
import { UserContext, DbUserContext } from "./Context/UserContext";
import { auth } from "./Authentication/firebase-config";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import GetUser from "./APIs/getUser";

const Logo = require("../assets/Logo.png");

function LoginPage({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const { dbUser, setDbUser } = useContext(DbUserContext);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    async function getDbUser() {
      if (user) {
        await setDbUser(await GetUser(user.email));
        navigation.navigate("MainDrawer");
      }
    }
    getDbUser();
    return () => unsubscribe();
  }, [user]);

  async function handleLogin() {
    try {
      const isConfirmed = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleSignUp = () => {
    navigation.navigate("Create Account");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={Logo} />
      </View>
      <View style={styles.card}>
        <Text style={{ fontSize: 20, alignSelf: "center", marginBottom: 5 }}>
          Login
        </Text>
        <TextInput
          style={styles.inputbar}
          placeholder="loginEmail"
          value={loginEmail}
          onChangeText={setLoginEmail}
        />
        <TextInput
          style={styles.inputbar}
          placeholder="loginPassword"
          value={loginPassword}
          onChangeText={setLoginPassword}
          secureTextEntry
        />
        <Text>Logged in as: {user?.email}</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Login"
            mode="contained"
            textColor="white"
            style={{
              backgroundColor: "purple",
            }}
            onPress={handleLogin}
          >
            Login
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Create Account"
            mode="contained"
            textColor="white"
            style={{ backgroundColor: "purple" }}
            onPress={handleSignUp}
          >
            Create Account
          </Button>
        </View>
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
    backgroundColor: "purple",
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
    marginBottom: 20,
    width: 220,
    height: 180,
    borderRadius: 30,
  },

  logo: {
    flex: 1,
    borderRadius: 10,
    resizeMode: "stretch",
  },

  buttonContainer: {
    marginTop: 10,
    width: 150,
    alignSelf: "center",
  },
});

export default LoginPage;
