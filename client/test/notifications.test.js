import React from "react";
import { create, act } from "react-test-renderer";
import NotificationItem from "../src/components/NotificationItem";

// mock fetch functions
global.fetch = jest.fn()
global.env = jest.fn()
// set test `Headers`
global.Headers = () => ({
  append: jest.fn(),
});

/**
 * Tests for the Notification Item of type relationship
 */
describe("<NotificationItem type={`relationship`}/>", () => {
  let notificationDeleted = false;
  let deletedNotificationId;
  let feedItems = 2;

  let props;
  const createProps = () => ({
    key: 1,
    text: "Kim wants to connect with you",
    timestamp: 15864314430000,
    notification_type: "relationship",
    data: {
      status: "PENDING",
      follower: {
        _id: "431",
        name: "Kim",
        profile_picture: null,
        bio: "Kim is a very good app tester",
      },
    },
    id: "12e1ce12e3",
    deleteNotification: jest.fn((id) => {
      deletedNotificationId = id;
      notificationDeleted = true;
      feedItems -= 1;
    }),
    refresh: jest.fn(),
  });

  beforeEach(() => {
    props = createProps();
  });

  test("snapshot of the notification item component", async () => {
    const feed = create(<NotificationItem {...props} />).toJSON();
    expect(feed).toMatchSnapshot();
  });

  test("test if onLongPress will delete the notification", async () => {
    const component = create(<NotificationItem {...props} />);
    const instance = component.root;
    const notification = instance.findByType("View");
    const notificationTouchableOpacity = notification.props.children.props;

    expect(notificationDeleted).toBeFalsy();
    expect(feedItems).toBe(2)
    notificationTouchableOpacity.onLongPress();
    expect(notificationDeleted).toBe(true);
    expect(deletedNotificationId).toBe(props.id);
    expect(feedItems).toBe(1)
  });

  test("test if FollowRequestModal will open onPress the notification item", () => {
    const component = create(<NotificationItem {...props} />);
    const instance = component.root;
    const notification = instance.findByType("View");
    const notificationTouchableOpacity = notification.props.children.props;

    expect(instance.instance.state.followModal).toBeFalsy();
    notificationTouchableOpacity.onPress()
    expect(instance.instance.state.followModal).toBe(true);
  })

  test("test decline request button", () => {
    const component = create(<NotificationItem {...props} />);
    const instance = component.root;
    const notification = instance.findByType("View");
    const declineButton = notification.props.children.props.children[1].props.children[2].props.children[0].props;

    declineButton.onPress()
    expect(instance.instance.state.accepted).toBeFalsy();
  })

  test("test accept request button", () => {
    const component = create(<NotificationItem {...props} />);
    const instance = component.root;
    const notification = instance.findByType("View");
    const acceptButton = notification.props.children.props.children[1].props.children[2].props.children[1].props;

    expect(instance.instance.state.accepted).toBeFalsy();
    acceptButton.onPress()
    expect(instance.instance.state.accepted).toBe(true);
  })
});

/**
 * Tests for the Notification Item of type status
 */
describe("<NotificationItem type={`status`}/>", () => {
  let notificationDeleted = false;
  let deletedNotificationId;
  let feedItems = 2;

  let props;
  const createProps = () => ({
    key: 1,
    text: "Kim liked your status",
    timestamp: 15864314430000,
    notification_type: "status",
    id: "12e1ce12e3",
    data: {
      user: {
        _id: "431",
        name: "Kim",
        profile_picture: null,
        bio: "Kim is a very good app tester",
      },
    },
    deleteNotification: jest.fn((id) => {
      deletedNotificationId = id;
      notificationDeleted = true;
      feedItems -= 1;
    }),
    refresh: jest.fn(),
  });

  beforeEach(() => {
    props = createProps();
  });

  test("snapshot of the notification item component", async () => {
    const feed = create(<NotificationItem {...props} />).toJSON();
    expect(feed).toMatchSnapshot();
  });

  test("test if onLongPress will delete the notification", async () => {
    const component = create(<NotificationItem {...props} />);
    const instance = component.root;
    const notification = instance.findByType("View");
    const notificationTouchableOpacity = notification.props.children.props;

    expect(notificationDeleted).toBeFalsy();
    expect(feedItems).toBe(2)
    notificationTouchableOpacity.onLongPress();
    expect(notificationDeleted).toBe(true);
    expect(deletedNotificationId).toBe(props.id);
    expect(feedItems).toBe(1)
  });
})
