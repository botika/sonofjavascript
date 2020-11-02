// @flow
import { createStore } from "redux";

import { BAD_REQUEST } from "api";
import { Pokemon } from "api/generation";
import { middleware } from "store";

import { getGeneration, reducer } from "store/generation";

const resp: [Pokemon] = [{ name: "foo", image: "bar", url: "foo" }];

function request() {
  return new Promise((resolve) => {
    resolve(resp);
  });
}

const ERR_MSG = "foo";

function errorRequestMsg() {
  return new Promise(() => {
    throw new Error(ERR_MSG);
  });
}

function errorRequest() {
  return new Promise(() => {
    throw new Error();
  });
}

function storeBuilder() {
  return createStore(reducer, middleware);
}

function checkOn(state) {
  expect(state).toBeDefined();
  expect(state.on).toBeTruthy();
  expect(state.response).toBeUndefined();
  expect(state.error).toBeUndefined();
}

test("Request", async () => {
  const store = storeBuilder();
  const promise = store.dispatch(getGeneration(request()));
  checkOn(store.getState());

  await promise;
  const state = store.getState();
  expect(state).toBeDefined();
  expect(state.on).toBeFalsy();
  expect(state.response).toEqual(resp);
  expect(state.error).toBeUndefined();
});

test("Propagating error", async () => {
  const store = storeBuilder();
  await store.dispatch(getGeneration(errorRequestMsg()));
  const getData = store.getState();
  expect(getData).toBeDefined();
  expect(getData.on).toBeFalsy();
  expect(getData.response).toBeUndefined();
  expect(getData.error).toEqual(ERR_MSG);
});

test("Propagating error without message", async () => {
  const store = storeBuilder();
  await store.dispatch(getGeneration(errorRequest()));
  const getData = store.getState();
  expect(getData).toBeDefined();
  expect(getData.on).toBeFalsy();
  expect(getData.response).toBeUndefined();
  expect(getData.error).toEqual(BAD_REQUEST);
});

test("Manage flag on request", async () => {
  const store = storeBuilder();
  const promise = store.dispatch(getGeneration(request()));
  checkOn(store.getState());
  await promise;

  const getData1 = store.getState();
  expect(getData1).toBeDefined();
  expect(getData1.on).toBeFalsy();
  expect(getData1.response).toEqual(resp);
  expect(getData1.error).toBeUndefined();
});
