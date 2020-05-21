import { AsyncStorage } from "react-native";

module.exports = {
  update: async toUpdate => {
    var myHeaders = new Headers();
    var userToken = await AsyncStorage.getItem("token");

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", userToken);

    const body = toUpdate;

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify(body)
    };

    var response = await fetch(
      `http://${env.host}:${env.port}/api/v1/user/data`,
      requestOptions
    ).catch(() => {
      return false;
    });
    var responseJson = await response.json();

    // return true if update was successful and some fields were updated
    if (responseJson.nModified > 0) return true;

    return false;
  }
};
