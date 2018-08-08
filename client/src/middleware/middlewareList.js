export const logger = (store) => (next) => (action) => {
    console.log('action fired', action)
    next(action)
  }
  
export const displayChangeLogger = (store) => (next) => (action) => {
      action.type === "displayChange" ? console.log('Action fired --> displayChange') : null
      next(action) // Allows the next action to move on
  }
  
export const error = (store) => (next) => (action) => {
      try {
          next(action) // MANDATORY!
      }
      catch(e) {
          console.log('Error', e)
      }
  }
  