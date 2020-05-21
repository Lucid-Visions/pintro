import React from "react";
import { create, act } from "react-test-renderer";
import FollowModal from "../src/components/followRequestModal";

describe("<FollowRequestModal />", () => {
  let props;
  let accepted;

  const connection = {
    startTime: 15866159730000,
    intent: "Unit Testing",
    message: "I want to help you do unit tests",
  };

  const createProps = (isVisible) => ({
    visible: isVisible,
    toggle: jest.fn(() => props = createProps(!props.visible)),
    onModalHide: jest.fn(() => props = createProps(!props.visible)),
    accepted: false,
    data: {
      status: "PENDING",
      follower: {
        _id: "431",
        name: "Kim",
        profile_picture: null,
        bio: "Kim is a very good app tester",
      },
    },
    connection,
    respond: jest.fn((x) => (accepted = x)),
    profile_picture: null,
    connectModal: null,
  });

  beforeEach(() => {
      props = createProps(true)
  })

  test("snapshot of the component", () => {
    const component = create(<FollowModal {...props} />).toJSON();
    expect(component).toMatchSnapshot();
  });

  test('test backdrop to close the modal', () => {
    const component = create(<FollowModal {...props} />)
    const instance = component.root
    const modal = instance.findByType("Modal")
    const backdrop = modal.children[0].props

    expect(props.visible).toBe(true);
    // click on backdrop
    backdrop.onPress();
    expect(props.visible).toBe(false);
  })

  test('test close modal button', () => {
    const component = create(<FollowModal {...props} />)
    const instance = component.root
    const modal = instance.findByType("Modal")
    const closeBtn = modal.props

    expect(props.visible).toBe(true);
    // click on backdrop
    closeBtn.onModalHide();
    expect(props.visible).toBe(false);
  })
});
