import React from 'react';
import renderer from 'react-test-renderer';
import CompaniesButtonComponent from '../src/components/CompaniesButton';

test('Companies button renders correctly', () => {
    const component = renderer.create(<CompaniesButtonComponent />).toJSON();
    expect(component).toMatchSnapshot();
});