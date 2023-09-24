import React, { useState, useEffect } from "react";
import {
  Text,
  Picker,
  View,
} from "react-native";
import DropDownMenu from "./EventDropDownMenu";
import EventList from "./EventList";
import axios from "axios";



const axiosBase = axios.create({
    baseURL: "https://game-master-be.onrender.com/api/",
  });

const fetchEvents = () => axiosBase.get("events");
const fetchBoardGameEvents = () => axiosBase.get("events?gameType=Board Games")
const fetchCardGameEvents = () => axiosBase.get("events?gameType=Card Games")

    
 

const EventsPage = () => {

    const [selectedValue, setSelectedValue] = useState('All')
    const [currentEventList, setCurrentEventList] = useState([]);


    useEffect(() => {
      if (selectedValue === "All") {
        fetchEvents()
          .then(({ data }) => {
            setCurrentEventList(data);
          })
          .catch((err) => {
            console.error("Error fetching events: ", err);
          });
      } else if (selectedValue === "Board Game") {
        console.log('Inside the Board Games block', selectedValue)
        fetchBoardGameEvents()
          .then(({ data }) => {
            setCurrentEventList(data);
          })
          .catch((err) => {
            console.error("Error fetching board game events: ", err);
          });
      } else if (selectedValue === "Card Game") {
        console.log('Inside the Card Games block', selectedValue)

        fetchCardGameEvents()
          .then(({ data }) => {
            setCurrentEventList(data);
          })
          .catch((err) => {
            console.error("Error fetching board game events: ", err);
          });
      }
    }, [selectedValue]);
    
  return (
    <View>
      <DropDownMenu  selectedValue={selectedValue} onValueChange={setSelectedValue} />
      <EventList currentEventList={currentEventList} />
    </View>
  );

}



export default EventsPage;