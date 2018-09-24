import { combineReducers } from 'redux'
import { combineEpics } from "redux-observable"
import counter, { counterEpic } from './counter'
import { messageEpic } from './message'


export const rootReducer = combineReducers({
  counter
})

export const rootEpic = combineEpics(
  counterEpic,
  messageEpic,
)
export default rootReducer