import React, { useState } from "react";
import Modal from "react-native-modal";
import { Dimensions, StyleSheet } from "react-native";
import EmptyState from "./EmptyState";

const NoResultModal = (props) => {

  const toggleModal = () => {
    props.toggle();
  };

  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={props.isVisible}
      onBackdropPress={() => toggleModal()}
      style={styles.modal}
    >
      <EmptyState modal={true} state={"results"} onPress={() => toggleModal()}/>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "space-evenly",
    backgroundColor: "#FCFCFC",
    maxHeight: 500,
    width: Dimensions.get("screen").width / 1.2,
    padding: 10,
    paddingTop: 50,
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    marginTop: Dimensions.get("screen").height / 9
  }
});

export default NoResultModal;
