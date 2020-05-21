import React from 'react'
import { create, act } from "react-test-renderer"
import OurJourney from '../src/components/OurJourney'

describe("<OurJourney />", () => {
    const props = {
        dateFounded: 15864314430000,
        location: "test center",
        companySize: 20,
        funding: "Looking for money"
    }
    test("snapshot of the component", () => {
        const component = create(<OurJourney {...props} />).toJSON()
        expect(component).toMatchSnapshot();
    })

    test("snapshot of the component with no info in props", () => {
        const component = create(<OurJourney />).toJSON()
        expect(component).toMatchSnapshot();
    })
})