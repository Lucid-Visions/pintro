import Constants from "expo-constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight+20,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        marginHorizontal: 20
    },
    containerHorizontal: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center"
    },
    pickerContainer: {
        fontSize: 13,
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        padding: 20
    },
    header: {
        fontFamily: "poppins-bold",
        margin: "auto",
        textAlign: "left",
        alignItems: "baseline",
        fontSize: 24,
        paddingTop: 30
    },
    headerRecommendations: {
        fontFamily: "poppins-bold",
        margin: "auto",
        textAlign: "left",
        alignItems: "baseline",
        fontSize: 24
    },
    headerText: {
        fontFamily: "poppins-regular",
        margin: "auto",
        textAlign: "left",
        alignItems: "baseline",
        fontSize: 12,
        paddingTop: 20,
        paddingBottom: 30
    },
    headerTextRecommendations: {
        fontFamily: "poppins-regular",
        margin: "auto",
        textAlign: "left",
        alignItems: "baseline",
        fontSize: 12,
        paddingTop: 50
    },
    categoryHeader: {
        fontFamily: "poppins-regular",
        margin: "auto",
        textAlign: "left",
        alignItems: "baseline",
        fontSize: 12,
        paddingBottom: 5
    },
    categoryHeaderBold: {
        fontFamily: "poppins-semi-bold",
        margin: "auto",
        textAlign: "left",
        alignItems: "baseline",
        fontSize: 14,
        paddingBottom: 20,
        paddingTop: 50
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
        alignItems: 'center',
        marginVertical: 10,
    },
    submitBtn: {
        backgroundColor: "black",
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "black",
        color: "black",
        width: 300,
        marginVertical: 50
    },
    sectionContainer: {
        width: "100%"
    },
    heading: {
        fontFamily: "poppins-medium",
        fontSize: 10,
        color: "#A9A9A9",
        marginLeft: 30,
        marginTop: 30
    },
    tags: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center"
    },
    tagScrollContainer: {
        overflow: "hidden"
    },
    recommendationsRow: {
        flex: 1,
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        paddingBottom: 15
    },
});

export default styles;
