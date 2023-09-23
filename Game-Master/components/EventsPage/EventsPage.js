import React, { useState } from "react";
import {
  Text,
  Picker,
  View,
} from "react-native";
import DropDownMenu from "./EventDropDownMenu";
import EventList from "./EventList";



const EventsPage = () => {

  return (
    <View>
      <DropDownMenu/>
      <EventList/>
    </View>
  );

}



export default EventsPage;