import { combineEpics, ofType } from "redux-observable"
import { delay, mapTo } from "rxjs/operators"
import { createRequestTypes } from "../common/actionHelper";


const INITIAL_STATE = {
  num: 0
}

export const ADD = 'ADD'
export const MINUS = 'MINUS'
export const LIST = createRequestTypes('count/list');

export const add = () => {
  return {
    type: ADD
  }
}
export const minus = () => {
  return {
    type: MINUS
  }
}
export const list = () => {
  return {
    type: LIST.REQUEST,
    payload: {
      endpoint: '/lottery_next/query',
      params: {
        size:15
      },
      method: 'GET'
    }
  }
}

// 异步的action
export function asyncAdd () {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}


export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1
      }
     case MINUS:
       return {
         ...state,
         num: state.num - 1
       }
     default:
       return state
  }
}

const addEpic = (action$) =>
  action$.pipe(
    ofType(ADD),
    delay(1000),
    mapTo(minus())
  )

export const counterEpic = combineEpics(addEpic)

