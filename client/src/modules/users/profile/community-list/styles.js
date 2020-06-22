import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight + 20,
    flex: 1,
    backgroundColor: "#F0F0F1",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingBottom: 50,
    paddingHorizontal: 20
  },
})

export default styles