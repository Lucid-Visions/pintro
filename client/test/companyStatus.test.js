import React from 'react';
import renderer from 'react-test-renderer';
import CompanyStatusComponent from '../src/components/CompanyStatus';

test('Component renders correctly', () => {
    const component = renderer.create(<CompanyStatusComponent />).toJSON();
    expect(component).toMatchSnapshot();
});