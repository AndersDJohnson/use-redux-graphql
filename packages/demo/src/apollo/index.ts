import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { makeResolver } from "apollo-redux-query";
import { store } from "../redux/store";
// @ts-ignore
import REDUX_GRAPHQL from './redux.graphql';

console.log('ADJ REDUX_GRAPHQL', REDUX_GRAPHQL);

const typeDefs = gql`${REDUX_GRAPHQL}`;

const resolvers = {
  Query: {
    redux: makeResolver({ store })
  }
};

export const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
  resolvers,
  typeDefs
});
