import React from 'react';
import renderer from 'react-test-renderer';
import EmptyState from '../src/components/EmptyState';

test('Empty state renders correctly', () => {
    const component = renderer.create(<EmptyState state="internet"/>).toJSON();
    expect(component).toMatchSnapshot();
});
