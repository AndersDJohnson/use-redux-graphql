import { addTypenames } from "./addTypenames";

const makeResolver = ({ store }) => () => ({
  __typename: "Redux",
  ...addTypenames(store.getState())
});

export { makeResolver };
