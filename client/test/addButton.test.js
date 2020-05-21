import React from 'react';
import renderer from 'react-test-renderer';
import AddButton from '../src/components/AddButton';

test('Button renders correctly', () => {
    const component = renderer.create(<AddButton />).toJSON();
    expect(component).toMatchSnapshot();
});

test('Action passed to button performed', () => {
    const actionFunction = () => console.log("hello");
    const component = renderer.create(<AddButton action={actionFunction} />);
    const instance = component.getInstance();
    expect(instance.state.action).toBe(actionFunction);
})

