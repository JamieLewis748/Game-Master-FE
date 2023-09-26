import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView, Text, View } from "react-native";
import LoginPage from "../Game-Master/components/LoginPage";
import EventDetails from "../Game-Master/components/EventDetails";
import AccountPage from "./components/AccountPage";
import CreateAccount from "./components/CreateAccount";
import CreateEvent from "./components/CreateEvent";
import Collection from "./components/Collection";
import MessagesScreen from "./components/MessagesScreen";
import MyEventPage from "./components/MyEventPage";
import { createStackNavigator } from "@react-navigation/stack";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import UserProvider from "./components/Context/ContextProvider";
import { UserContext, DbUserContext } from "./components/Context/UserContext";
import React, { useState, useContext, useEffect } from "react";
import Chat from "./components/Chat";
import io from "socket.io-client";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Footer from "./components/Footer";
import { CommonActions } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";

import EventsPage from "./components/EventsPage/EventsPage";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const EventsStack = createStackNavigator();
const CreateEventStack = createStackNavigator();

function EventsStackNavigator() {
  return (
    <EventsStack.Navigator>
      <EventsStack.Screen
        name="EventsPage"
        component={EventsPage}
        options={{ headerShown: false }}
      />

      <EventsStack.Screen
        name="Event Details"
        component={EventDetails}
        options={{ headerShown: false }}
      />
      <EventsStack.Screen
        name="My Event"
        component={MyEventPage}
        options={{ headerShown: false }}
      />
    </EventsStack.Navigator>
  );
}
function CreateEventStackNavigator() {
  return (
    <CreateEventStack.Navigator>
      <CreateEventStack.Screen
        name="Create Event"
        component={CreateEvent}
        options={{ headerShown: false }}
      />
      <CreateEventStack.Screen
        name="My Event"
        component={MyEventPage}
        options={{ headerShown: false }}
      />
    </CreateEventStack.Navigator>
  );
}

function MainDrawer({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Drawer.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
        }}
      >
        <Drawer.Screen name="My Account" component={AccountPage} />
        <Drawer.Screen
          name="Events"
          listeners={{
            focus: () => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "EventsPage" }],
                })
              );
            },
          }}
          component={EventsStackNavigator}
        />
        <Drawer.Screen name="Collection" component={Collection} />
        <Drawer.Screen name="Chat" component={Chat} />
        <Drawer.Screen
          name="Create Event"
          component={CreateEventStackNavigator}
        />
      </Drawer.Navigator>
      <Footer />
    </View>
  );
}

function App() {
  return (
    <UserProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Create Account" component={CreateAccount} />
            <Stack.Screen name="MainDrawer" component={MainDrawer} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </UserProvider>
  );
}

export default App;
