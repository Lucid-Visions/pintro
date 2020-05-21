import { Linking } from "expo";
import { AsyncStorage } from "react-native";


const Redirect = {
    async _handleUrl(url) {
      console.log(await AsyncStorage.getItem("token"));
        if ((await AsyncStorage.getItem("token")) == null) {
          alert("Please LogIn before clicking the verification link.");
          return;
        }
        let { path, queryParams } = Linking.parse(url.url);
        if (queryParams.emailverify) {
          var response = await fetch(
            `http://${env.host}:${env.port}/api/v1/verify/email_and_password`,
            {
              method: "POST",
              body: JSON.stringify({
                verification_secret: queryParams.verification_secret
              }),
              headers: new Headers({
                Authorization: await AsyncStorage.getItem("token"),
                "Content-Type": "application/json"
              })
              
            }
            
          ).catch(function(error) {
            console.log(error);
          });
          var responseJson = null;
            responseJson = await response.json().catch(function(error) {
            console.log(error);
          });
          alert(responseJson.message);
        }
      },

      _addLinkingListener(){

        Linking.removeAllListeners("url");
        Linking.addEventListener("url", Redirect._handleUrl);
      }
    }

export default Redirect