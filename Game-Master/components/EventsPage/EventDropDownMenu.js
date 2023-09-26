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
        <Picker.Item label='Next'  />
        <Picker.Item label='Last'  />
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
        <Picker.Item label='Event happening'  />
      </Picker>
    </>
  );

}



export default DropDownMenu;