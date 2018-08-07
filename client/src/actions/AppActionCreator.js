import axios from "axios";


// under add class reducer
export function classIncrement(){
    return{
        type: 'showClass',
        payload: 1
    }
}

// UNder display reducer
export function displayChange(displayObject){
  return {
    type: 'displayChange',
    payload: displayObject
  };
}
// Note: Thunk allows functions in dispatch items + delay if required
export const ThunkAddNewItem = (newItem) => {
    return(dispatch) => {
        axios.get(`validate-item/${newItem}`).then(res => {
            if (res.data !== false) {
              dispatch({
                  type: 'addItem',
                  payload: res.data
                })
            }
          });
    }
}

export function showIngredientLoading(displayType){
    return{
        type: 'showIngredientLoading',
        payload: displayType
    }
}

export function addCompleteItemList(list){
    return{
        type: 'completeList',
        payload: list
    }
}
// PhotoLoad
export function addPhoto(photoLoadObject){
    return {
        type: 'newPhotoLoad',
        payload: photoLoadObject
    }
}

export function addRecipes(recipeListObject){
    return{
        type: 'changeRecipesList',
        payload: recipeListObject
    }
}

export function clearRecipes(){
    return{
        type: 'clearRecipe',
        payload: {}
    }
}
export function changeRecommend(recommendObject){
    return {
        type: 'changeRecommend',
        payload: recommendObject
    }
}

export function addSelectedObject(newSelectedObj){
    return {
        type: 'changeObj',
        payload: newSelectedObj
    }
}

