import Constants from "expo-constants";
import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    statusText: {
        marginTop: 60,
        color: 'white',
        padding: '3%',
        fontFamily: "poppins-regular",
    },
    blackSquare: {
        zIndex: 0,
        backgroundColor: "#1A1A1A",
        minHeight: 225,
        width: Dimensions.get('screen').width / 1.1,
        borderRadius: 20,
        margin: 30,
        alignItems: "flex-start",
        fontSize: 13
    },
    profPic: {
        alignItems: "center",
        position: "absolute",
        zIndex: 1,
        bottom: 200
    },
    container: {
        flex: 1,
        backgroundColor: "#F1F1F1",
        justifyContent: "space-between",
        paddingVertical: 10
    },
    container1: {
        flex: 1,
        backgroundColor: "#F1F1F1",
        justifyContent: "space-between",
        paddingTop: Constants.statusBarHeight+20,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        marginHorizontal: 20
    },
    container2: {
        flexDirection: "column",
        alignItems: "center",
        margin: 0
    },
    h1: {
        fontFamily: "poppins-bold",
        color: "#2E2E2E",
        margin: "auto",
        textAlign: "center",
        fontSize: 25
    },
    h2: {
        fontFamily: "poppins-regular",
        color: "#2E2E2E",
        margin: "auto",
        alignSelf: "center",
        fontSize: 11,
        paddingBottom: 20
    },
    h3: {
        fontFamily: "poppins-regular",
        color: "#2E2E2E",
        margin: "auto",
        alignSelf: "flex-start",
        textAlign: "center",
        fontSize: 12,
        paddingBottom: 10,
        paddingTop: 20
    },
    placeholder: {
        fontFamily: "poppins-regular",
        borderBottomWidth: 1,
        margin: "auto",
        alignItems: "stretch",
        fontSize: 13,
        marginBottom: 50,
        paddingVertical: 15
    },
    btn: {
        fontFamily: "poppins-medium",
        width: 350,
        marginTop: 15,
        backgroundColor: "#1A1A1A",
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    btnDisabled: {
        opacity: 0.4,
    }
});

export default styles;