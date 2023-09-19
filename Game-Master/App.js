import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, Text } from "react-native";
import LoginPage from "../Game-Master/components/LoginPage";
import EventDetails from "../Game-Master/components/EventDetails";
import EventList from "./components/EventList";
import AccountPage from "./components/AccountPage";

const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>Home Screen</Text>
    </SafeAreaView>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* <Stack.Navigator initialRouteName="Account Page"> */}
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "My Home" }}
        />
        <Stack.Screen
          name="Events"
          component={EventList}
          options={{ title: "Events" }}
        />
        <Stack.Screen
          name="Event Details"
          component={EventDetails}
          options={{ title: "Event Details" }}
        />
        <Stack.Screen
          name="Account Page"
          component={AccountPage}
          options={{ title: "Account Page" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
