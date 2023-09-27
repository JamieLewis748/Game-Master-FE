import React, { useState } from "react";
import { Text, Picker, View, StyleSheet } from "react-native";
import { Card } from "react-native-paper";

const DropDownMenu = ({ selectedValue, onValueChange, selectedTimeDateValue, onTimeDateValueChange }) => {

  return (
    <>
      <Card style={{ margin: 10}}>
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
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  dropdowns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 15,
    marginRight: 15,
  },
  pickers: {
    display: "flex",
    padding: 8,
    backgroundColor: 'rgb(37, 35, 42)',
    color: 'white',
    textAlign: "left",
    borderColor: "purple",
    borderRadius: 5
  },
});


export default DropDownMenu;
