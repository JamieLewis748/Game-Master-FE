import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView, Text } from "react-native";
import LoginPage from "../Game-Master/components/LoginPage";
import EventDetails from "../Game-Master/components/EventDetails";
import EventList from "./components/EventList";
import AccountPage from "./components/AccountPage";
import CreateAccount from "./components/CreateAccount";
import CreateEvent from "./components/CreateEvent";
import Collection from "./components/Collection";
import { createStackNavigator } from "@react-navigation/stack";

const AppStack = createStackNavigator();
const EventsStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AccountStackNavigator() {
  return (
    <EventsStack.Navigator>
      <EventsStack.Screen
        name="Account"
        component={AccountPage}
        options={{ title: "Account" }}
      />
    </EventsStack.Navigator>
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
      {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
      <Tab.Screen name="Events" component={EventsStackNavigator} />
      <Tab.Screen name="Account" component={AccountStackNavigator} />
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
          name="Create Account"
          component={CreateAccount}
          options={{ title: "Create Account" }}
        />
        <AppStack.Screen
          name="Create Event"
          component={CreateEvent}
          options={{ title: "Create Event" }}
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
