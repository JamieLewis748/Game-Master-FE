import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView, Text } from "react-native";
import LoginPage from "../Game-Master/components/LoginPage";
import EventDetails from "../Game-Master/components/EventDetails";
import AccountPage from "./components/AccountPage";
import CreateAccount from "./components/CreateAccount";
import CreateEvent from "./components/CreateEvent";
import Collection from "./components/Collection";
import { createStackNavigator } from "@react-navigation/stack";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import UserProvider from "./components/Context/UserProvider";
import { UserContext, DbUserContext } from "./components/Context/UserContext";
import React, { useState, useContext, useEffect } from "react";
import Chat from "./components/Chat";
import io from 'socket.io-client';

import { Ionicons } from "@expo/vector-icons";

import EventsPage from "./components/EventsPage/EventsPage";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const EventsStack = createStackNavigator();


const socket = io('https://socket-server-3xoa.onrender.com');

console.log("here")

socket.on('connect', () => {
  console.log('Connected to the WebSocket server on port 8080');
  socket.emit('join', 'New user has connected');
});

console.log(socket)

function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={AccountPage}
        options={{
          title: "Account",
          headerBackTitleVisible: false,
          headerLeft: null,
          headerRight: () => (
            <Ionicons
              name="menu"
              size={28}
              color="black"
              style={{ marginLeft: 15, marginRight: 5 }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function CollectionStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Collection"
        component={Collection}
        options={{ title: "Collection" }}
      />
    </Stack.Navigator>
  );
}

function CreateEventStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Create Event"
        component={CreateEvent}
        options={{ title: "Create Event" }}
      />
    </Stack.Navigator>
  );
}


function EventsStackNavigator() {
  return (
    <EventsStack.Navigator>
      <EventsStack.Screen
        name="EventsPage"
        component={EventsPage}
        options={{ title: "EventsPage" }}
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
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Account Tab" component={AccountStack} />
      <Tab.Screen name="Create Event Tab" component={CreateEventStack} />
      <Tab.Screen name="Events" component={EventsStackNavigator} />

      <Tab.Screen name="Collection" component={Collection} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="CollectionStack" component={CollectionStack} />

    </Tab.Navigator>
  );
}

function App() {
  const [messagesCount, setMessagesCount] = useState([]);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages(++messagesCount);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  return (
    <UserProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Group>
              <Stack.Screen
                name="Login"
                component={LoginPage}
                options={{ title: "Login" }}
              />
              <Stack.Screen
                name="Create Account"
                component={CreateAccount}
                options={{ title: "Create Account" }}
              />
            </Stack.Group>
            <Stack.Group>
              <Stack.Screen
                name="Create Event"
                component={CreateEvent}
                options={{ title: "Create Event" }}
              />
              <Stack.Screen
                name="MainTabs"
                component={MainTabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Account"
                component={AccountPage}
                options={{ title: "Account" }}
              />
              <Stack.Screen
                name="Chat"
                component={Chat}
                options={{ title: "Chat" }}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </UserProvider>
  );
}

export default App;
