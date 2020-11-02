// @flow
import { BAD_REQUEST } from "api";

const ON = "ON FETCH";
export const onAction = { type: ON };
const OK = "OK FETCH";
export function okAction<T>(response: T) {
  return { type: OK, response };
}
const ERR = "ERROR FETCH";
export function errAction(e) {
  return { type: ERR, error: e.message || BAD_REQUEST };
}

export type State<T> = {
  on: boolean,
  error: string,
  response: T,
};

const ON_FETCH = { on: true };

// Reducer
export function reducer<T>(_: State<T>, action): State<T> {
  switch (action.type) {
    case OK:
      return { on: false, response: action.response };
    case ON:
      return ON_FETCH;
    case ERR:
      return { on: false, error: action.error };
    default:
      throw new Error();
  }
}

export const INIT_DATA = { on: false };
