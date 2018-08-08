import { combineReducers } from 'redux'
import {addClass, display, items, photoLoad, recommend, selectedObj } from './reducerList'


import {recipes} from './reducerList'

const rootReducer = combineReducers({
    addClass,
    display,
    items,
    photoLoad,
    recommend,
    selectedObj,
    recipes
})

export default rootReducer;