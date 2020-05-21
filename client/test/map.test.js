import React from "react";
import MapCard from "../src/components/MapCard";
import MarkerComponent from "../src/components/MarkerComponent"
import MapPinComponent from "../src/components/MapPinComponent"
import {create, act} from "react-test-renderer";

/**
 * tests for the MapCard component
 */

describe("<MapCard />", () => {
  // set up props
  const createTestProps = (props) => ({
    navigation: {
      navigate: jest.fn(),
    },
    ...props,
  });

  let props;
  beforeEach(() => {
    props = createTestProps({
      user: {
        uid: 123,
        name: "Kim Berguoni",
        bio:
          "Lorem ipsum dolor sit amet," +
          "consectetur adipiscing elit, sed do eiusmod ",
        experience: {
          currentJobTitle: "Window cleaner",
          currentCompany: "CleanWindows Ltd.",
        },
      },
    });
  });

  test("test if MapCard renders properly", () => {
    const mapCard = create(<MapCard {...props} />).toJSON();
    expect(mapCard).toMatchSnapshot();
  });

  test("test if empty MapCard will render null", () => {
    const mapCard = create(<MapCard />).toJSON();
    expect(mapCard).toMatchSnapshot();
  });

  test("test when you click on MapCard to navigate to Profile with the given uid in props", () => {
    const mapCard = create(<MapCard {...props} />);
    const instance = mapCard.root;
    const cardView = instance.findByType("View")

    cardView.props.onClick()
    expect(props.navigation.navigate).toHaveBeenCalledWith("Profile",{uid: props.uid})
  })
});

/**
 * Tests for the markers on the map
 */
describe("<MarkerComponent />", () => {
  let index;
  const scrollMock = jest.fn((i) => index = i)
  const props = {
    id: 1,
    index: 22,
    coordinate: {
      latitude: 0.12123231,
      longitude: 0.002331232
    },
  }

  test("snapshot of component", () => {
    const component = create(<MarkerComponent scrollToIndex={scrollMock} {...props}/>).toJSON();
    expect(component).toMatchSnapshot();
  })

  test("test if when you click on marker it brings you to the correct index", () => {
    const component = create(<MarkerComponent scrollToIndex={scrollMock} {...props}/>);
    const instance = component.root;
    const marker = instance.findByType("AIRMapMarker");
    
    expect(index).toBeFalsy()
    marker.props.onPress()
    expect(props.index).toBe(index)
  })

  test("snapshots of all variations of <MapPinComponent /> used in <MarkerComponent />", () => {
    const selectedRight = create(<MapPinComponent selected={true} left={false}/>).toJSON();
    const selectedLeft = create(<MapPinComponent selected={true} left={true}/>).toJSON();

    const notSelectedLeft = create(<MapPinComponent selected={false} left={true}/>).toJSON();

    const defaultComponent = create(<MapPinComponent />).toJSON();

    expect(selectedRight).toMatchSnapshot();
    expect(selectedLeft).toMatchSnapshot();
    expect(notSelectedLeft).toMatchSnapshot();
    expect(defaultComponent).toMatchSnapshot();
  })

})


