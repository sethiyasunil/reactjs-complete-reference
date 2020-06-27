import React from 'react'
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {BurgerBuilder} from "./BurgerBuilder";
import BuildControls  from '../../components/Burger/BuildControls/BuildControls'

configure({adapter:new Adapter()})

describe('<BurgerBuilder/>', ()=>{
    let wrapper = null
    beforeEach(()=>{
        wrapper = shallow(<BurgerBuilder onInitIngredients={()=>{}}/>)
    })

    it('should not contain <BuildControls/> if ingredients are missing', ()=>{
        expect(wrapper.find(BuildControls)).toHaveLength(0)
    })



    it('should not contain <BuildControls/> if ingredients are present', ()=>{
        wrapper.setProps({ingredients: {salad:1}})
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    })
})