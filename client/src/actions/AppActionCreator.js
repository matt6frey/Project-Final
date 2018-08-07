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

export const ThunkAddNewItem = (newItem) => {
    return(dispatch) => {
        fetch(`validate-item/${newItem}`)
        .then(res => res.json())
        .then(res => {
            if(res.data !== false){
                dispatch({
                    type: 'addItem',
                    payload: newItem
                })
            }
        })
    }
}

export function showIngredientLoading(displayType){
    return{
        type: 'showIngredientLoading',
        payload: displayType
    }
}
// for items

export function addItem(item){
    return {
        type: 'addItem',
        payload: item
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

