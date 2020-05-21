import React from 'react';
import renderer, { fireEvent } from 'react-test-renderer';
import ChatConnectPopup from '../src/components/ChatConnectPopup';

let visible = true
const mockToggle = jest.fn(() => visible=false)

test('Chat pop up renders correctly', () => {
    const component = renderer.create(<ChatConnectPopup name="Bill Gates" chat="Chat" toggle={mockToggle}/>).toJSON();
    expect(component).toMatchSnapshot();
});

test('Chat pop up renders correctly with different params', () => {
    const component = renderer.create(<ChatConnectPopup name="Bill Gates" chat="Connect" toggle={mockToggle}/>).toJSON();
    expect(component).toMatchSnapshot();
});

test('test backdrop press', () => {
    const component = renderer.create(<ChatConnectPopup name="Bill Gates" chat="Connect" toggle={mockToggle}/>);
    const instance = component.root
    const modal = instance.findByType("Modal")
    const backdrop = modal.children[0].props

    expect(visible).toBe(true);
    // click on backdrop
    backdrop.onPress();
    expect(visible).toBe(false);
});

