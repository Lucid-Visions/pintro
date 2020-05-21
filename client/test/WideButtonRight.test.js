import React from "react";
import WideButtonRight from "../src/components/WideButtonRight";
import renderer from "react-test-renderer";

it('WideButtonRight renders correctly', () => {
    const tree = renderer
      .create(
      <WideButtonRight>
        value={"TEST VALUE"}
        source={require("../src/assets/arrow-right-white.png")}
      </WideButtonRight>)
      .toJSON();
    expect(tree).toMatchSnapshot();
});

it('WideButtonRight renders correctly', () => {
    const tree = renderer
      .create(
      <WideButtonRight>
        value={"TEST VALUE"}
      </WideButtonRight>)
      .toJSON();
    expect(tree).toMatchSnapshot();
});

it('WideButtonRight renders correctly', () => {
    const tree = renderer
      .create(
      <WideButtonRight>
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
      </WideButtonRight>)
      .toJSON();
    expect(tree).toMatchSnapshot();
});

it('WideButtonRight renders correctly', () => {
    const tree = renderer
      .create(
      <WideButtonRight>
      </WideButtonRight>)
      .toJSON();
    expect(tree).toMatchSnapshot();
});
