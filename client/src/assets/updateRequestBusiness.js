import { AsyncStorage } from "react-native";

module.exports = {
  update: async (id, toUpdate) => {
    var dummyID = "5e868c88c76b120093310db1"

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
      `http://${env.host}:${env.port}/api/v1/business/${id}`,
      requestOptions
    ).catch(() => {
      return false;
    });
    var responseJson = await response.json();

    //console.log(id)

    // return true if update was successful and some fields were updated
    if (responseJson.nModified > 0) return true;

    return false;
  }
};
