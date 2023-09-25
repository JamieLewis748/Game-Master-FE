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
    baseURL: "https://game-master-be.onrender.com/api/"});

const EventsPage = () => {
    const [currentEventList, setCurrentEventList] = useState([]);
    const [selectedValue, setSelectedValue] = useState('')
    const [selectedTimeDateValue, setSelectedTimeDateValue] = useState('Next')
    const [query, setQuery] = useState('')
    const [order, setOrder] = useState('1')
    const [gameType, setGameType] = useState('')
    
    useEffect(() => {
      if (selectedTimeDateValue === "Next") {
        setOrder("1");
      }
      if (selectedTimeDateValue === "Last") {
        setOrder("-1");
      };
    }, [selectedTimeDateValue]);
    
    useEffect(() => {
      if (selectedValue !== 'All') {
        setGameType(selectedValue);
      } else {
        setGameType('')
      }
    }, [selectedValue]);
    
    
    useEffect(()=> {
      if (gameType === "Event happening" || gameType === '') {
        setQuery(`?sortBy=dateTime&order=${order}`);
      } else {
        setQuery(`?gameType=${gameType}&order=${order}`);
      }
    }, [order, gameType])
    
    useEffect(() => {
      axiosBase.get(`events/${query}`)
      .then(({ data }) => {
       setCurrentEventList(data)})
      .catch((err) => {
          console.error("Error fetching events: ", err);
          });
  },[query])
    
  return (
    <View>
      <DropDownMenu  selectedValue={selectedValue} onValueChange={setSelectedValue} selectedTimeDateValue={selectedTimeDateValue} onTimeDateValueChange={setSelectedTimeDateValue} />
      <EventList currentEventList={currentEventList} />
    </View>
  );
}



export default EventsPage;