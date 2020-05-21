
export default async function show(showNotification, notification) {
  console.log(notification)
  showNotification({
    title: notification.data.title,
    message: notification.data.body,
    onPress: () => {}
  });
}