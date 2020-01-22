import * as React from "react";
import gql from "graphql-tag";
import { useReduxGraphQuery } from "../../use-redux-graphql";
import { ReduxGQLQuery } from "./__generated__/reduxGQL";

const COMP_QUERY = gql`
  {
    redux {
      name
      nested {
        flag
      }
    }
  }
`;

export const Comp = () => {
  const { data } = useReduxGraphQuery<ReduxGQLQuery>(COMP_QUERY);

  console.log("render", { data });

  return <h1>name: {data && data.redux && data.redux.name}</h1>;
};
