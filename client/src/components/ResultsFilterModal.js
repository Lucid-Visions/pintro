import React, { useState } from "react";
import Modal from "react-native-modal";
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { filters } from "../assets/resultFilters";

const ResultFilterModal = props => {
  const toggleModal = () => {
    props.toggle();
  };

  const toggleFilter = filter => {
    props.filterToggle(filter);
  };

  const businessFilterItem = (itemType) => {

    return (
      <TouchableOpacity
        onPress={() => {toggleFilter(itemType)}}
      >
        <View style={styles.filterItem}>
          <Text
            style={[
              styles.filterOptionHeader,
              props.activeFilters[itemType] && styles.selectedFilter
            ]}
          >
            {filters[itemType].name}
          </Text>
          <Text style={styles.filterOptionText}>Business profiles only</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationIn="zoomIn"
      animationOut="zoomOut"
      isVisible={props.activeFilters.modalVisible}
      onBackdropPress={toggleModal}
      style={styles.modal}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.modalHeader}>Select a filter..</Text>
        <TouchableOpacity onPress={toggleModal}>
          <Ionicons style={{ marginRight: 10 }} name="md-close" size={22} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={styles.filterItemsContainer}>
          {businessFilterItem("investment")}
          {businessFilterItem("hiring")}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    flex: 1,
    fontFamily: "poppins-regular",
    fontSize: 11,
    padding: 10
  },
  filterOptionHeader: {
    fontFamily: "poppins-medium",
    fontSize: 12,
    marginTop: 6
  },
  selectedFilter: {
    fontFamily: "poppins-semi-bold",
    color: "#E1963D"
  },
  filterOptionText: {
    fontFamily: "poppins-regular",
    color: "grey",
    fontSize: 10
  },
  filterItem: {
    flexDirection: "column",
    marginTop: 5,
    paddingLeft: 30
  },
  modal: {
    justifyContent: "flex-start",
    backgroundColor: "#FCFCFC",
    maxHeight: 170,
    width: Dimensions.get("screen").width / 1.2,
    padding: 10,
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "flex-start",
    marginTop: Dimensions.get("screen").height / 4
  },
  filterItemsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  }
});

export default ResultFilterModal;
