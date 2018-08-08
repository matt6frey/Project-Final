
import {createSelector} from 'reselect';

const display = (state) => state.display;

export const displaySelector = createSelector(
  [display],
  (disp ) => disp
);


const photoLoad = (state) => state.photoLoad
export const photoLoadSelector = createSelector(
  [photoLoad],
  (load) => load
);


const addClass = (state) => state.addClass
export const addClassSelector = createSelector(
  [addClass],
  (addClass) => addClass
)


const recommend = (state) => state.recommend
export const recommendSelector = createSelector(
  [recommend],
  (recommend) => recommend
)


const items = (state) => state.items
export const itemsSelector = createSelector(
  [items],
  (items) => items
)

const selectedObj = (state) => state.selectedObj
export const selectedObjSelector = createSelector(
  [selectedObj],
  (selecObj) => selecObj
)

const recipes = (state) => state.recipes
export const recipesSelector = createSelector(
    [recipes],
    (recipes) => recipes
)