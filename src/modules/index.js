import { combineReducers } from 'redux'
import counter from './counter'



export const rootRedcer = combineReducers({
  counter
})

export default rootRedcer