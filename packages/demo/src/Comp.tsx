import * as React from "react";
import gql from "graphql-tag";
import { useReduxQuery } from "apollo-redux-query";
import { ReduxGQLQuery } from "./__generated__/reduxGQL";

const COMP_QUERY = gql`
  query CompQuery {
    redux @client {
      name
      nested {
        flag
      }
    }
  }
`;

export const Comp = () => {
  const { data, error } = useReduxQuery<ReduxGQLQuery>(COMP_QUERY);

  console.log("render", { data, error });

  if (error) return <div>error</div>;

  return <h1>name: {data?.redux?.name}</h1>;
};
