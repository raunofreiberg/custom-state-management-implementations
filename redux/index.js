import React from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import combineReducers from "./ting";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const createStore = reducer => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = listener => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};

const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

const name = (state = "Rauno", action) => {
  switch (action.type) {
    case "SET_NAME":
      return action.name;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  counter,
  name
});
const store = createStore(rootReducer);

const StatelessComponent = ({ dispatch, getState }) => {
  return (
    <div>
      <h1>
        {getState().counter} - {getState().name}
        <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
        <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
        <button
          onClick={() => dispatch({ type: "SET_NAME", name: "hello world" })}
        >
          Set Name
        </button>
      </h1>
    </div>
  );
};

const renderMethod = () =>
  render(<StatelessComponent {...store} />, document.getElementById("root"));

store.subscribe(renderMethod);

renderMethod();

