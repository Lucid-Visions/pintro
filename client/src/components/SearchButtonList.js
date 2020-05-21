import React from "react"
import {View, StyleSheet} from "react-native"
import SearchButton from "./SearchButton"
import searchIconsData from "../assets/searchIconsData"

class SearchButtonList extends React.Component {
    constructor() {
        super()
        this.state = {
            icons: searchIconsData,
        }
    }


    
    render() {
        const searchButtons = this.state.icons.map(item => <SearchButton callbackFunction={this.props.searchCallback} key={item.id} item={item} />)
        
        return (
            <View style={styles.container}>
                {searchButtons}
            </View>
        )    
    }

    
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingHorizontal: 20
    }
});

export default SearchButtonList