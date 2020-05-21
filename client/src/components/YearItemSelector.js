import React, { Component } from "react";
import RNPickerSelect from 'react-native-picker-select';
import { TextInput, View, StyleSheet, ShadowPropTypesIOS } from "react-native"

function yearsPickerArray() {
  let itemsArr = []
  for (let i = 2030; i >= 1920; i--) {
      itemsArr.push({
          value: `${i}`,
          label: `${i}        `
      });
  }
  return itemsArr
}

function YearItemSelector({callback, yearValue, yearPlaceholder, value, placeholder, id, type, blackTheme}) {
  return (
    <View style={styles.twoColumns}>
      <RNPickerSelect
        placeholder={yearPlaceholder ? {label: `${yearPlaceholder}`, value: yearPlaceholder} : {label: "Year", value: null}}
        onValueChange={year => callback(year, id, type, true)}
        value={yearValue}
        items={yearsPickerArray()}
        style={blackTheme ? pickerStyleDark : pickerStyle}
      />
      <TextInput
        style={styles.placeholder}
        width={250}
        color={blackTheme ? "black" : "white"}
        placeholderTextColor={blackTheme ? "grey"  : "white"}
        borderBottomColor={blackTheme ? "grey"  : "lightgrey"}
        borderBottomWidth={1}
        placeholder={placeholder || (type === "education" ? "Enter school name..." : "Enter company name...")}
        onChangeText={inputValue => callback(inputValue, id, type, false)}
        value={value}
      />
    </View>
  );
}

const pickerStyle = {
	inputIOS: {
        color: 'white',
        fontSize: 13,
        fontFamily: "poppins-regular",
        marginTop: 20
	},
	inputAndroid: {
        color: 'white',
        fontSize: 13,
        fontFamily: "poppins-regular",
        marginTop: 20

	},
	placeholderColor: 'white',
};

const pickerStyleDark = {
	inputIOS: {
        color: 'black',
        fontSize: 13,
        fontFamily: "poppins-regular",
        marginTop: 20
	},
	inputAndroid: {
        color: 'black',
        fontSize: 13,
        fontFamily: "poppins-regular",
        marginTop: 20

	},
	placeholderColor: 'grey',
};


const styles = StyleSheet.create({
      placeholder: {
        fontFamily: "poppins-regular",
        textAlign: "left", 
        color: "white",
        margin: "auto",
        alignItems: "baseline",
        fontSize: 13,
        paddingVertical: 20
      },
      twoColumns: {
        flexDirection: 'row',
        width: 350,
        alignSelf: "flex-start",
        alignItems: "center",
        justifyContent: "space-between"
      },
})

export default YearItemSelector;
