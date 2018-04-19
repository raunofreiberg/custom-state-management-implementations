import React from "react";
import { render } from "react-dom";

const StatelessComponent = ({
  counter,
  name,
  increment,
  decrement,
  setName,
  clearName
}) => (
  <div>
    <h1>
      {counter} - {name}
    </h1>
    <button onClick={increment}>+</button>
    <button onClick={decrement}>-</button>
    <button onClick={() => setName("test dude 2")}>New name</button>
    <button onClick={clearName}>Clear name</button>
  </div>
);

const withState = (Component, state, actions) =>
  class extends React.Component {
    state = state;

    componentDidMount() {
      for (const key in actions) {
        const func = actions[key];

        this.setState(prevState => ({
          ...prevState,
          [key]: (...args) => this.setState(func(this.state, ...args))
        }));
      }
    }

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  };

const StatefulComponent = withState(
  StatelessComponent,
  {
    counter: 0,
    name: "test dude"
  },
  {
    increment: state => ({
      ...state,
      counter: state.counter + 1
    }),
    decrement: state => ({
      ...state,
      counter: state.counter - 1
    }),
    setName: (state, name) => ({
      ...state,
      name
    }),
    clearName: state => ({
      ...state,
      name: ""
    })
  }
);

render(<StatefulComponent />, document.getElementById("root"));

