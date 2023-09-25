import React, { useState } from "react";
import {
  Text,
  Picker,
} from "react-native";



const DropDownMenu = ({ selectedValue, onValueChange, selectedTimeDateValue, onTimeDateValueChange }) => {

  return (
    <>
      <Text>Filter by date</Text>
      <Picker
        selectedValue={selectedTimeDateValue}
        onValueChange={(itemValue) => onTimeDateValueChange(itemValue)}
      >
        <Picker.Item label='Latest'  />
        <Picker.Item label='Oldest'  />
      </Picker>
      
      <Text>Select a game type</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => onValueChange(itemValue)}
      >
        <Picker.Item label='All'  />
        <Picker.Item label='Board Game'  />
        <Picker.Item label='Card Game'  />
        <Picker.Item label='Tabletop'  />
        <Picker.Item label='RPG'  />
      </Picker>
    </>
  );

}



export default DropDownMenu;