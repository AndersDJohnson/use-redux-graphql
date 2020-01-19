import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { makeResolver } from "../../../apollo-redux-query/src";
import { store } from "../redux/store";

const typeDefs = gql`
  type Place {
    kind: String
  }

  type Nested {
    flag: Boolean
    place: Place
  }

  type Redux {
    name: String
    nested: Nested
  }

  extend type Query {
    redux: Redux
  }
`;

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
