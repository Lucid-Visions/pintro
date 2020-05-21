import React from 'react';
import renderer from 'react-test-renderer';
import ConnectModal from '../src/components/ConnectModal';

test('Experience component renders correctly', () => {
    const component = renderer.create(<ConnectModal />).toJSON();
    expect(component).toMatchSnapshot();
});