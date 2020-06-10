import React from "react";
import RNPickerSelect from 'react-native-picker-select';
import { TextInput, View, StyleSheet } from "react-native";
import moment from 'moment';

function yearsPickerArray() {
  let years = [];
  for(let i = 0; i<100; i++){
    let year = (moment().year())-i
    years.push({
      value: `${year}`,
      label: `${year}`
    })
  }
  return years;
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
        placeholderTextColor={blackTheme ? "grey"  : "white"}
      />
      <TextInput
        style={blackTheme ? styles.placeholderDark : styles.placeholder}
        width={250}
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
    marginTop: 20,
	},
	inputAndroid: {
    color: 'white',
    fontSize: 13,
    width: 105,
    fontFamily: "poppins-regular",
    marginTop: 20,
	},
	placeholderColor: 'white',
};

const pickerStyleDark = {
	inputIOS: {
    color: 'black',
    fontSize: 13,
    fontFamily: "poppins-regular",
    marginTop: 20,
    paddingLeft: 20
	},
	inputAndroid: {
    color: 'black',
    width: 105,
    fontSize: 13,
    fontFamily: "poppins-regular",
    marginTop: 20,
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
    paddingVertical: 20,
  },
  placeholderDark: {
    fontFamily: "poppins-regular",
    textAlign: "left", 
    color: "black",
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
