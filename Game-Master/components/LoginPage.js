import React, { useState, useContext, useEffect } from "react";
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
import { UserContext, DbUserContext } from "./Context/UserContext";
import { auth } from "./Authentication/firebase-config";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import GetUser from "./APIs/getUser";

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
        await setDbUser(await GetUser(user.email))
        navigation.navigate("MainTabs", { screen: "Account" });
      }
    }
    getDbUser()  
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

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (authUser) => {
  //     setUser(authUser);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (authUser) => {
  //     setUser(authUser);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
  //     setUser(authUser);

  //     if (authUser) {
  //       const response = await setDbUser(GetUser(authUser.email));
  //       console.log(response);

  //       if (response) {
  //         navigation.navigate("MainTabs", { screen: "Account" });
  //       }
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [navigation]);

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
          <Button title="Login" onPress={handleLogin} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Create Account" onPress={handleSignUp} />
        </View>
      </View>
      {/* <View style={styles.buttonContainer}>
        <Button title="See events" onPress={handleEventLog} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Create Event" onPress={handleCreateEvent} />
      </View> */}
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
