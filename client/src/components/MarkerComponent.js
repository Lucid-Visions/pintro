import MapView, { Marker } from "react-native-maps";
import React, { Component } from "react";
import MapPinComponent from "./MapPinComponent";

class MarkerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      coordinate: props.coordinate,
      index: props.index,
      selected:props.selected
    };
  }

  shouldComponentUpdate(nextProps){
      return (this.props.coordinate != nextProps.coordinate || this.props.selected != nextProps.selected || this.props.index != nextProps.index)
  }
  render() {
    return (
      <Marker
        key={this.props.id}
        coordinate={this.props.coordinate}
        onPress={() => {
          this.props.scrollToIndex(this.props.index);
        }}
      >
        <MapPinComponent selected={this.props.index == this.props.selected} left={false} />
      </Marker>
    );
  }
}

export default MarkerComponent;
