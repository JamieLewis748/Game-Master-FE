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

const fetchDescendingOrderEvents = () => axiosBase.get("events?sortBy=dateTime&order=1")
const fetchAscendingOrderEvents = () => axiosBase.get("events?sortBy=dateTime&order=-1")

const EventsPage = () => {
    
    const [selectedValue, setSelectedValue] = useState('All')
    const [currentEventList, setCurrentEventList] = useState([]);
    const [selectedTimeDateValue, setSelectedTimeDateValue] = useState('Latest')

    const [query, setQuery] = useState('')
    const [order, setOrder] = useState('Asc')
    const [sortBy, setSortBy] = useState('dateTime')
    const [gameType, setGameType] = useState('')


    useEffect(()=> {
      setQuery(`?sortBy=${sortBy}&order=${order}`)
    }, [order, sortBy, gameType])

    useEffect(() => {
      if (selectedTimeDateValue === "Latest") {
        fetchAscendingOrderEvents()
          .then(({ data }) => {
            setCurrentEventList(data);
          })
          .catch((err) => {
            console.error("Error fetching events in ascending date and time order: ", err);
          });
      } else if (selectedTimeDateValue === "Oldest") {
        fetchDescendingOrderEvents()
          .then(({ data }) => {
            setCurrentEventList(data);
          })
          .catch((err) => {
            console.error("Error fetching board game events in descending date and time  order: ", err);
          });
      }
    }, [selectedTimeDateValue, selectedValue]);

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
      <DropDownMenu  selectedValue={selectedValue} onValueChange={setSelectedValue} selectedTimeDateValue={selectedTimeDateValue} onTimeDateValueChange={setSelectedTimeDateValue} />
      <EventList currentEventList={currentEventList} />
    </View>
  );

}



export default EventsPage;