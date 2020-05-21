import React from 'react';
import renderer from 'react-test-renderer';
import ConnectionButton from '../src/components/ConnectionButton';

test('Button renders correctly', () => {
    const component = renderer.create(<ConnectionButton swipe={(() => null, () => null, () => null)} />).toJSON();
    expect(component).toMatchSnapshot();
});