import React from 'react'
import { create, act } from 'react-test-renderer'
import SearchButtonList from '../src/components/SearchButtonList'

describe('<SearchButtonList />',() => {
    let selectedItems = []

    const mockCallback = jest.fn((category, isSelected) => {
        if(isSelected) selectedItems.push(category)
        else {
            const position = selectedItems.indexOf(category);

            if ( ~position ) selectedItems.splice(position, 1);
        }
    })

    beforeEach(() => {
        selectedItems = []
    })

    test('snapshot of the component', () => {
        const component = create(<SearchButtonList searchCallback={mockCallback} />).toJSON()
        expect(component).toMatchSnapshot()
    })

    test('test if selected category is added to array of selected categories', async () => {
        const component = create(<SearchButtonList searchCallback={mockCallback} />)
        const instance = component.root
        const buttons = instance.findByType('View')
        const categoryOne = buttons.children[0].children[0].props

        expect(selectedItems).toHaveLength(0)
        await categoryOne.onPress()
        expect(selectedItems).toHaveLength(1)
    })

    test('test adding and removing a few categories', async () => {
        const component = create(<SearchButtonList searchCallback={mockCallback} />)
        const instance = component.root
        const buttons = instance.findByType('View')
        const categoryOne = buttons.children[0].children[0].props
        const categoryTwo = buttons.children[1].children[0].props
        const categoryThree = buttons.children[2].children[0].props

        expect(selectedItems).toHaveLength(0)
        await categoryOne.onPress()
        expect(selectedItems).toHaveLength(1)
        await categoryOne.onPress()
        expect(selectedItems).toHaveLength(0)

        await categoryTwo.onPress()
        expect(selectedItems).toHaveLength(1)

        await categoryThree.onPress()
        expect(selectedItems).toHaveLength(2)
        await categoryThree.onPress()
        expect(selectedItems).toHaveLength(1)
    })
})