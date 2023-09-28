import React, { useState } from "react";
import { Text, Picker, View, StyleSheet } from "react-native";
import { Card } from "react-native-paper";

const DropDownMenu = ({ selectedValue, onValueChange, selectedTimeDateValue, onTimeDateValueChange }) => {

  return (
    <>
      <Card style={{ margin: 10, backgroundColor: 'purple'}}>
        <View style={styles.dropdowns}>
          <View style={styles.pickers}>
          <Text style={styles.text} >Date</Text>
          </View>
          <Picker
            style={styles.pickers}
            selectedValue={selectedTimeDateValue}
            onValueChange={(itemValue) => onTimeDateValueChange(itemValue)}
          >
            <Picker.Item label="Next" />
            <Picker.Item label="Last" />
          </Picker>

          <View style={styles.pickers}>
          <Text style={styles.text} >Game type</Text>

          </View>
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
  },
  pickers: {
    display: "flex",
    backgroundColor: 'rgb(37, 35, 42)',
    color: 'white',
    alignItems: "center",
    borderRadius: 5,
    width: '25%',
    height: 40,
    justifyContent: "center",
    fontSize: 16,
  },
  text: {
    color: 'white',
    justifyContent: "center",
    fontSize: 16,
    marginLeft:1,
  }
});


export default DropDownMenu;
