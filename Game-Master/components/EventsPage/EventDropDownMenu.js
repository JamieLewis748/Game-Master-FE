import React, { useState } from "react";
import {
  Text,
  Picker,
} from "react-native";



const DropDownMenu = () => {

  const [value, setValue] = useState(['']);
    
  const handleValueChange = (itemValue) => {
    setValue(itemValue)
  }

  return (
    <>
      <Text>Select a game type</Text>
      <Picker
        value={value}
        onValueChange={handleValueChange}
      >
        <Picker.Item label='Board Game' value='boardGame' />
        <Picker.Item label='Card Game' value='cardGame' />
      </Picker>
      <Text>You have selected: {value}</Text>
    </>
  );

}



export default DropDownMenu;