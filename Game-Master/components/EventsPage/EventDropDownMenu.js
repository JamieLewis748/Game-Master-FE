import React, { useState } from "react";
import {
  Text,
  Picker,
} from "react-native";



const DropDownMenu = ({ selectedValue, onValueChange }) => {

  return (
    <>
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
      <Text>You have selected: {selectedValue}</Text>
    </>
  );

}



export default DropDownMenu;