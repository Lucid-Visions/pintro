import React from "react";
import { create, act } from "react-test-renderer";
import {
  FollowMeButton,
  MessageMeButton,
  ExtrasButton,
  ViewConnectionsButton,
  NewPostButton,
} from "../src/components/ProfileActionButtons";


/* Test for the action buttons in the profile page
 * "FOLLOW ME", "MESSAGE ME", "NEW POST", "CONNECTIONS", "..."
 * onPress functions are mocked and being tested if called onPress of buttons
*/

describe("<FollowMeButton />", () => {
  let requestSent;
  const mockOnPress = jest.fn(() => (requestSent = true));

  test("snapshot of component with status PENDING", () => {
    const component = create(
      <FollowMeButton onPress={mockOnPress} text={"PENDING"} />
    ).toJSON();
    expect(component).toMatchSnapshot();
  });

  test("snapshot of component with status NOT CONNECTED", () => {
    const component = create(
      <FollowMeButton onPress={mockOnPress} text={"NOT CONNECTED"} />
    ).toJSON();
    expect(component).toMatchSnapshot();
  });

  test("test if onPress will send request", () => {
    const component = create(
      <FollowMeButton onPress={mockOnPress} text={"PENDING"} />
    );
    const instance = component.root;
    const button = instance.findByType("View");

    expect(requestSent).toBeFalsy();
    button.props.onClick();
    expect(requestSent).toBe(true);
  });
});

describe("<MessageMeButton />", () => {
  let openMessageRequestModal;
  const mockOnPress = jest.fn(() => (openMessageRequestModal = true));

  test("snapshot of component", () => {
    const component = create(
      <MessageMeButton onPress={mockOnPress} />
    ).toJSON();
    expect(component).toMatchSnapshot();
  });

  test("test if onPress will open message me modal", () => {
    const component = create(<MessageMeButton onPress={mockOnPress} />);
    const instance = component.root;
    const button = instance.findByType("View");

    expect(openMessageRequestModal).toBeFalsy();
    button.props.onClick();
    expect(openMessageRequestModal).toBe(true);
  });
});

describe("<ExtrasButton />", () => {
  let extrasClicked;
  const mockOnPress = jest.fn(() => (extrasClicked = true));

  test("snapshot of component with some action onPress", () => {
    const component = create(<ExtrasButton action={mockOnPress} />).toJSON();
    expect(component).toMatchSnapshot();
  });

  test("test onPress with no function to change something", () => {
    const component = create(<ExtrasButton />);
    const instance = component.root;
    const button = instance.findByType("View");

    expect(extrasClicked).toBeFalsy();
    button.props.onClick();
    expect(extrasClicked).toBeFalsy();
  });

  test("test if onPress will work", () => {
    const component = create(<ExtrasButton action={mockOnPress} />);
    const instance = component.root;
    const button = instance.findByType("View");

    expect(extrasClicked).toBeFalsy();
    button.props.onClick();
    expect(extrasClicked).toBe(true);
  });
});

describe("<ViewConnectionsButton />", () => {
  let redirectedToConnections;
  const mockOnPress = jest.fn(() => (redirectedToConnections = true));

  test("snapshot of component", () => {
    const component = create(<ViewConnectionsButton onPress={mockOnPress} />).toJSON();
    expect(component).toMatchSnapshot();
  });

  test("test if onPress will redirect user to another page", () => {
    const component = create(<ViewConnectionsButton onPress={mockOnPress} />);
    const instance = component.root;
    const button = instance.findByType("View");

    expect(redirectedToConnections).toBeFalsy();
    button.props.onClick();
    expect(redirectedToConnections).toBe(true);
  });
});

describe("<NewPostButton />", () => {
    let newPostOpened;
    const mockOnPress = jest.fn(() => (newPostOpened = true));
  
    test("snapshot of component", () => {
      const component = create(<NewPostButton onPress={mockOnPress} />).toJSON();
      expect(component).toMatchSnapshot();
    });
  
    test("test if onPress will redirect user to write new post", () => {
      const component = create(<NewPostButton onPress={mockOnPress} />);
      const instance = component.root;
      const button = instance.findByType("View");
  
      expect(newPostOpened).toBeFalsy();
      button.props.onClick();
      expect(newPostOpened).toBe(true);
    });
  });
