import { applyMiddleware, createStore } from 'redux'
import rootReducer from '../reducers/rootReducer'
import { logger, displayChangeLogger, error} from '../middleware/middlewareList'
import thunk from 'redux-thunk'

const middleware = applyMiddleware(thunk, logger, displayChangeLogger, error)
const store = createStore(rootReducer, middleware);


export default store