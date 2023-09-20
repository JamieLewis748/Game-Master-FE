import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView, Text } from "react-native";
import LoginPage from "../Game-Master/components/LoginPage";
import EventDetails from "../Game-Master/components/EventDetails";
import EventList from "./components/EventList";
import AccountPage from "./components/AccountPage";
import { createStackNavigator } from "@react-navigation/stack";

const AppStack = createStackNavigator();
const EventsStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>Home Screen</Text>
    </SafeAreaView>
  );
}

function EventsStackNavigator() {
  return (
    <EventsStack.Navigator>
      <EventsStack.Screen
        name="EventList"
        component={EventList}
        options={{ title: "Events" }}
      />
      <EventsStack.Screen
        name="Event Details"
        component={EventDetails}
        options={{ title: "Event Details" }}
      />
    </EventsStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Events" component={EventsStackNavigator} />
      <Tab.Screen name="Account" component={AccountPage} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName="Login">
        {/* <Stack.Navigator initialRouteName="Login"> */}
        <AppStack.Screen
          name="Login"
          component={LoginPage}
          options={{ title: "Login" }}
        />
        <AppStack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
