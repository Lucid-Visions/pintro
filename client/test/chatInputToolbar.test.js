import React from 'react';
import ReactDOM from 'react-dom';
import renderer, { act } from 'react-test-renderer';
import ChatInputToolbar from '../src/components/ChatInputToolbar';
import { TextInput } from 'react-native';

test('Chat input toolbar renders correctly', () => {
    const component = renderer.create(<ChatInputToolbar />).toJSON();
    expect(component).toMatchSnapshot();
});

/**test('State changes when input value changes', async () => {
    const component = renderer.create(<ChatInputToolbar />);
    const input = component.root.findByType(TextInput);
    const mockChange = {
        target: {
            value: 'test'
        }
    }
    act(() => {
         input.dispatchEvent(new TextEvent('change', mockChange));
    })
     expect(component.state.message).toBe('test');
})
*/