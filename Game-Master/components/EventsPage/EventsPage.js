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
const fetchTabletopEvents = () => axiosBase.get("events?gameType=Tabletop")
const fetchRPGEvents = () => axiosBase.get("events?gameType=RPG")



    
 

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
        fetchBoardGameEvents()
          .then(({ data }) => {
            setCurrentEventList(data);
          })
          .catch((err) => {
            console.error("Error fetching board game events: ", err);
          });
      } else if (selectedValue === "Card Game") {
        fetchCardGameEvents()
          .then(({ data }) => {
            setCurrentEventList(data);
          })
          .catch((err) => {
            console.error("Error fetching card game events: ", err);
          });
      } else if (selectedValue === "Tabletop") {
        fetchTabletopEvents()
          .then(({ data }) => {
            setCurrentEventList(data);
          })
          .catch((err) => {
            console.error("Error fetching Tabletop game events: ", err);
          });
        } else if (selectedValue === "RPG") {
          fetchRPGEvents()
            .then(({ data }) => {
              setCurrentEventList(data);
            })
            .catch((err) => {
              console.error("Error fetching RPG game events: ", err);
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