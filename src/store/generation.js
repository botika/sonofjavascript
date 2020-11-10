// @flow
import { BAD_REQUEST } from "api";
import { Pokemon } from "api/generation";

const ON = "ON GENERATION FETCH";
const OK = "OK GENERATION FETCH";
const ERR = "ERROR GENERATION FETCH";

// Action for get generation information
export function getGeneration(request: Promise<Pokemon[]>) {
  return (dispatch) => {
    dispatch({ type: ON });

    return request.then(
      (response) => dispatch({ type: OK, response }),
      (e) => dispatch({ type: ERR, error: e.message || BAD_REQUEST })
    );
  };
}

export type State = {
  on: boolean,
  response?: Pokemon[],
  error?: string,
};

export const INIT_DATA: State = { on: false };
const ON_FETCH: State = { on: true };

// Reducer
export function reducer(state = INIT_DATA, action) {
  switch (action.type) {
    case OK:
      return { on: false, response: action.response };
    case ON:
      return ON_FETCH;
    case ERR:
      return { on: false, error: action.error };
    default:
      return state;
  }
}
