const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";

const _REQUEST = `_${REQUEST}`;
const _SUCCESS = `_${SUCCESS}`;
const _FAILURE = `_${FAILURE}`;

export const createRequestTypes = base => {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
};

export function isRequestType(action) {
  return action.type.includes(_REQUEST)
}
// XXX_REQUEST => XXX_SUCCESS
export function actionToSuccess(action) {
  const success = action.type.replace(_REQUEST, _SUCCESS)
  return {
    ...action,
    type: success,
  }
}
// XXX_REQUEST => XXX_FAIL
export function actionToFail(action) {
  const fail = action.type.replace(_REQUEST, _FAILURE)
  return {
    ...action,
    type: fail,
  }
}

export default createRequestTypes;
