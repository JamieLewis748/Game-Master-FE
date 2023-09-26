import React, { useState } from "react";
import { Text, Picker, View, StyleSheet } from "react-native";

const DropDownMenu = ({ selectedValue, onValueChange, selectedTimeDateValue, onTimeDateValueChange }) => {

  return (
    <>
      <View style={styles.dropdowns}>
        <Text style={styles.pickers}>Date</Text>
        <Picker
          style={styles.pickers}
          selectedValue={selectedTimeDateValue}
          onValueChange={(itemValue) => onTimeDateValueChange(itemValue)}
        >
          <Picker.Item label="Next" />
          <Picker.Item label="Last" />
        </Picker>

        <Text style={styles.pickers}>Game type</Text>
        <Picker
          style={styles.pickers}
          selectedValue={selectedValue}
          onValueChange={(itemValue) => onValueChange(itemValue)}
        >
          <Picker.Item label="All" />
          <Picker.Item label="Board Game" />
          <Picker.Item label="Card Game" />
          <Picker.Item label="Tabletop" />
          <Picker.Item label="RPG" />
          <Picker.Item label="Event happening" />
        </Picker>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dropdowns: {
    display: "flex",
    flexDirection: "row",
    width: "auto",
  },
  pickers: {
    display: "flex",
    padding: 8,
    backgroundColor: 'rgb(37, 35, 42)',
    color: 'white',
    textAlign: "left"
  },
});


export default DropDownMenu;