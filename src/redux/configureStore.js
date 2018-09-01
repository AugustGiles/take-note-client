import { createStore, applyMiddleware, compose } from 'redux'
import takeNoteAppReducer from './reducer'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const configureStore = () => {
  const store = createStore(
    takeNoteAppReducer,
    composeEnhancers(applyMiddleware(thunk))
  )
  return store
}
