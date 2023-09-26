import React, { useState, useEffect, useContext } from "react";
import { Card } from "react-native-paper";
import {ScrollView, SafeAreaView } from "react-native";
import DropDownMenu from "./EventDropDownMenu";
import EventList from "./EventList";
import axios from "axios";
import { DbUserContext } from "../Context/UserContext";


const axiosBase = axios.create({
  baseURL: "https://game-master-be.onrender.com/api/"
});

const EventsPage = (navigation = { navigation }) => {
  const { dbUser, setDbUser } = useContext(DbUserContext);

  const [currentEventList, setCurrentEventList] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedTimeDateValue, setSelectedTimeDateValue] = useState('Next');
  const [query, setQuery] = useState('');
  const [order, setOrder] = useState('1');
  const [gameType, setGameType] = useState('');

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
      setGameType('');
    }
  }, [selectedValue]);


  useEffect(() => {
    if (gameType === "Event happening" || gameType === '') {
      setQuery(`?sortBy=dateTime&order=${order}`);
    } else {
      setQuery(`?gameType=${gameType}&order=${order}`);
    }
  }, [order, gameType]);

  useEffect(() => {
    axiosBase.get(`events/${query}`)
      .then(({ data }) => {
        setCurrentEventList(data);
      })
      .catch((err) => {
        console.error("Error fetching events: ", err);
      });
  }, [query]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "purple" }}>
      <DropDownMenu
        selectedValue={selectedValue}
        onValueChange={setSelectedValue}
        selectedTimeDateValue={selectedTimeDateValue}
        onTimeDateValueChange={setSelectedTimeDateValue}
      />
      <ScrollView>
        <Card
          style={{
            marginLeft: 10,
            marginRight: 10,
            backgroundColor: 'mediumorchid',
          }}
        >
          <EventList
            currentEventList={currentEventList}
            navigation={navigation}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};



export default EventsPage;