export function addClass (state=0, action){
    const {type, payload} = action
    switch(type){
        case 'showClass':
          return state + payload
        case 'addClass':
          return payload
        default:
          return state
    }
}


export function display(state={
    image: "none",
    chooseFile: "inline",
    submitPic: "none",
    loadingBar: "none",
    loadingBarIngredient: "none"
}, action){
    const {type, payload} = action

    switch(type){
        case 'displayChange':
          return payload
        case 'showIngredientLoading':
          return state.loadingBarIngredient = payload
        default:
          return state
    }
}



export function items(state=[], action){
    const {type, payload} = action
    switch(type){
        case 'completeList':
          return payload
        case 'addItem':
          return state.concat(payload)
        default:
          return state
    }
}


export function photoLoad(state={
    imageURL: null,
    imageName: null
    }, action){
    const {type, payload} = action
    switch(type){
        case 'newPhotoLoad':
          return payload
        default:
          return state
    }
}


export function recipes(state=null, action){
    const { type, payload } = action
    switch(type){
        case 'changeRecipesList':
          return payload
        case 'clearRecipe':
          return payload
        default:
          return state
    }
}

export function recommend(state=[], action){
    const {type, payload} = action
    switch(type){
        case 'changeRecommend':
          return payload
        default:
          return state
    }
}


export function selectedObj(state={}, action){
    const {type, payload} = action
    switch(type){
        case 'changeObj':
          return payload
        default:
          return state
    }
}