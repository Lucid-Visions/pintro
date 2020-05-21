import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
const updateRequest = require("../assets/updateRequest").update;

export default async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    console.log("Failed to get push token for push notification!");
    return;
  }
  token = await Notifications.getExpoPushTokenAsync();
  return await updateRequest({ pushToken: token });
}
