import { store } from "./store";

export const updateName = () => {
  store.dispatch({ type: "NAME_UPDATE", payload: "New name " + Math.random() });
};

export const doRandom = () => {
  store.dispatch({ type: "RANDOM" });
};

export const doNothing = () => {
  store.dispatch({ type: "NOTHING" });
};
