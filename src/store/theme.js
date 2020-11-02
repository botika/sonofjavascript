// @flow
// Reducer wrapping WeatherResponse

export const STORAGE = "my_app_storage_theme";

const SET = "SET THEME";
const LOCAL = "LOCAL THEME";
const RESET = "RESET THEME";

// Action for get weather information from local storage if exist. if is on request will ignore action
export const fromLocal = { type: LOCAL };
// Action for clear weather information,
export const reset = { type: RESET };

type Payload = "default" | "light";

export function set(payload: Payload) {
  return { type: SET, payload };
}

export const INIT_DATA: Payload = "default";

// Reducer
export function reducer(state = INIT_DATA, action) {
  switch (action.type) {
    case SET: {
      const { payload } = action;
      window.localStorage.setItem(STORAGE, payload);
      return payload;
    }
    case RESET: {
      window.localStorage.removeItem(STORAGE);
      return INIT_DATA;
    }
    case LOCAL: {
      const data = window.localStorage.getItem(STORAGE);
      if (data) {
        return data;
      }
      return state;
    }
    default:
      return state;
  }
}
