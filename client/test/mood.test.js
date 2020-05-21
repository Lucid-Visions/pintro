import React from "react";
import MoodCard from "../src/components/MoodButtonCard";
import MoodButton from "../src/components/MoodButton";
import { create, act } from "react-test-renderer";
import moodIconsData from "../src/assets/moods/moodIconsData";

/**
 * these tests are for the mood icons card which is displayed in 
 * Profile Screen when user selects his new mood
 */
describe("<MoodButtonCard />", () => {
  let moodSelected;
  let props;

  // setup props
  const createProps = (item, isVisible) => ({
    selected: item,
    visible: isVisible,
    toggle: jest.fn((x) => (moodSelected = x)),
  });

  beforeEach(() => {
    props = createProps(1, true);
  });

  test("snapshot of the card component", () => {
    const component = create(<MoodCard {...props} />).toJSON();

    expect(component).toMatchSnapshot();
  });

  test("test when click on backdrop if the selected mood stays the same as the initial one", () => {
    const card = create(<MoodCard {...props} />);
    const instance = card.root;
    // get reference to the backdrop element
    const modal = instance.findByType("Modal")
    const backdrop = modal.children[0].props

    expect(moodSelected).toBeFalsy();
    expect(modal.props.visible).toBe(true);
    // click on backdrop
    backdrop.onPress();
    expect(moodSelected).toBe(1);
  });

  describe("<MoodButtonCard /> with no initial selected mood", () => {
    beforeEach(() => {
      props = createProps(null, false);
    });

    test("snapshot of the card component", () => {
      const component = create(<MoodCard {...props} />).toJSON();
  
      expect(component).toMatchSnapshot();
    });

    test("check if mood button has correct text", () => {
      const card = create(<MoodCard {...props} />);
      const instance = card.root;
      // get reference to the backdrop element
      const modal = instance.findByType("Modal")
      // search for a mood button deep inside the component tree
      const moodButton = modal.props.children[2].props.children.props.children[1].props.children[0].props.item

      expect(moodButton.text).toBe("HAPPY")
    })

  })
});

describe("<MoodButton />", () => {
  let selectedIcon;
  const moodIcon = moodIconsData[0];
  let props;

  // set up props
  const createProps = (isChecked) => ({
    key: moodIcon.id,
    id: moodIcon.id,
    item: moodIcon,
    method: jest.fn((i) => (selectedIcon = i)),
    checked: isChecked,
  });

  beforeEach(() => {
    props = createProps(true);
  });

  afterEach(() => {
    props = createProps(false);
  });

  test("snapshot of the mood icon button", () => {
    const component = create(<MoodButton {...props} />).toJSON();

    expect(component).toMatchSnapshot();
  });

  test("test if button handles being selected", () => {
    const card = create(<MoodButton {...props} />);
    const instance = card.root;
    const button = instance.findByType("View");

    expect(selectedIcon).toBeFalsy();
    button.props.onClick();
    expect(selectedIcon);
  });
});
