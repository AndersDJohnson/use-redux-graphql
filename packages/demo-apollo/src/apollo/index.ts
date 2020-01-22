import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { makeResolver } from "../../../use-redux-graphql-apollo";
import { store } from "../redux/store";
// @ts-ignore
import REDUX_GRAPHQL from './graphql/redux.graphql';

const typeDefs = gql`${REDUX_GRAPHQL.replace('type Query', 'extend type Query')}`;

const resolvers = {
  Query: {
    redux: makeResolver({ store })
  }
};

export const client = new ApolloClient({
  // uri: "https://48p1r2roz4.sse.codesandbox.io",
  resolvers,
  typeDefs
});
