import { combineEpics, ofType } from "redux-observable";
import {
  delay,
  mapTo,
  map,
  mergeMap,
  filter,
  catchError
} from "rxjs/operators"; // rxjs v5.5+
import { from, of } from "rxjs";
import {
  createRequestTypes,
  isRequestType,
  actionToSuccess,
  actionToFail
} from "../common/actionHelper";
import { ajax, decodeResponse } from "../common/ajax";
import { API_ROOT } from '../constants';


// 转换请求
const requestEpic = (action$, store$) =>
  action$.pipe(
    filter(action => isRequestType(action)),
    mergeMap(action => {
      const {
        endpoint,
        method,
        isFormData,
        params,
        data,
        timeout
      } = action.payload;
      const host = action.payload.host ? action.payload.host : API_ROOT;
      const token = 'getToken(store$.value);'
      return from(ajax(host + endpoint, params, data, method, token, timeout)).pipe(
        map(response => {
          const success = actionToSuccess(action);
          success.payload = decodeResponse(response);
          return success;
        }),
        catchError(error => of({...actionToFail(action), error}))
      );
    }),
    catchError(error => {
      console.log(error);
      return of({type: 'system_error', error})
    })
  );

export const messageEpic = combineEpics(requestEpic);
