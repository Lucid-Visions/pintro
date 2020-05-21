import React from 'react';
import renderer from 'react-test-renderer';
import BadgeComponent from '../src/components/BadgeComponent';
import { Text, Image } from 'react-native';

test('Badge renders correctly', () => {
    const component = renderer.create(<BadgeComponent />).toJSON();
    expect(component).toMatchSnapshot();
});

test('Badge renders correct text', () => {
    const title = "connector";
    const component = renderer.create(<BadgeComponent title={title} />);
    const textValue = component.root.findByType(Text).props.children;
    expect(textValue).toBe("Super connector");
});

test('Badge renders correct icon', () => {
    const title = "connector";
    const image = require("../src/assets/badges/connector.png");
    const component = renderer.create(<BadgeComponent title={title} />);
    const imageValue = component.root.findByType(Image).props.source;
    expect(imageValue).toBe(image);
});

test('Badge renders correct times earned', () => {
    const title = "connector";
    const timesEarned = 3;
    const component = renderer.create(<BadgeComponent title={title} timesEarned={timesEarned} />);
    const textValue = component.root.findAllByType(Text)[0].props.children;
    expect(textValue).toBe(timesEarned);
});