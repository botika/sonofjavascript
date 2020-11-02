import { createStore } from "redux";

import { middleware } from "store";

import { fromLocal, reducer, reset, set, STORAGE } from "store/theme";

const DEFAULT = "default";
const LIGHT = "light";

function storeBuilder() {
  return createStore(reducer, middleware);
}

afterEach(() => {
  window.localStorage.removeItem(STORAGE);
});

test("From local storage", () => {
  window.localStorage.setItem(STORAGE, DEFAULT);
  const store = storeBuilder();
  store.dispatch(fromLocal);
  const getData = store.getState();
  expect(getData).toEqual(DEFAULT);
});

test("Reset", () => {
  window.localStorage.setItem(STORAGE, LIGHT);
  const store = storeBuilder();
  store.dispatch(fromLocal);
  const getData = store.getState();
  expect(getData).toEqual(LIGHT);
  store.dispatch(reset);

  const getData1 = store.getState();
  expect(getData1).toEqual(DEFAULT);
});

test("Set", () => {
  const store = storeBuilder();
  store.dispatch(set(LIGHT));
  const getData = store.getState();
  expect(getData).toEqual(LIGHT);
  const data = window.localStorage.getItem(STORAGE);
  expect(data).toEqual(LIGHT);
});
