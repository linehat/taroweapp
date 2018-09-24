import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createEpicMiddleware } from "redux-observable";
import { rootReducer, rootEpic} from '../modules'

const epicMiddleware = createEpicMiddleware()
const middlewares = [
  thunkMiddleware,
  createLogger(),
  epicMiddleware,
]

export default function configStore () {
  const store = createStore(rootReducer, applyMiddleware(...middlewares))
  epicMiddleware.run(rootEpic)
  return store
}
