import React from "react";
import WideButton from "../src/components/WideButton";
import renderer from "react-test-renderer";

it('WideButton renders correctly', () => {
    const tree = renderer
      .create(
      <WideButton>
        value={"TEST VALUE"}
        source={require("../src/assets/arrow-right-white.png")}
      </WideButton>)
      .toJSON();
    expect(tree).toMatchSnapshot();
});

it('WideButton renders correctly', () => {
    const tree = renderer
      .create(
      <WideButton>
        value={"TEST VALUE"}
      </WideButton>)
      .toJSON();
    expect(tree).toMatchSnapshot();
});

it('WideButton renders correctly', () => {
    const tree = renderer
      .create(
      <WideButton>
        value={"TEST VALUE"}
        containerStyle={{
            fontFamily: "poppins-medium", 
            width: 350,
            marginTop: 30,
            backgroundColor: "#1A1A1A",
            flexDirection: 'row', 
            justifyContent: 'space-evenly'
        }}
        textStyle={{ 
            fontSize: 14, 
            fontFamily: "poppins-light", 
            color: 'lightgrey' 
        }}
      </WideButton>)
      .toJSON();
    expect(tree).toMatchSnapshot();
});

it('WideButton renders correctly', () => {
    const tree = renderer
      .create(
      <WideButton>
      </WideButton>)
      .toJSON();
    expect(tree).toMatchSnapshot();
});
