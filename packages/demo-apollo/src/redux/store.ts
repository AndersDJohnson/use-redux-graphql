import { createStore } from "redux";

type Action = any;
type State = any;
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "NAME_UPDATE":
      return { ...state, name: action.payload };
    case "RANDOM": {
      return { ...state, nothing: Math.random() };
    }
    default:
      return state;
  }
};
const initialState: State = {
  name: "Pikachu",
  place: {
    kind: "World"
  },
  nested: {
    flag: true,
    place: {
      kind: "Gym"
    }
  }
};

const store = createStore(reducer, initialState);

// @ts-ignore
window.__STORE__ = store;

export { store };
