# apollo-redux-query

Connect to your Redux state with a client-side GraphQL query through Apollo.

This can help as you migrate an existing application from storing API response data in Redux
and accessing through selectors toward fetching it from a GraphQL server via React Hooks.

This can pair nicely with [`apollo-link-rest`](https://www.apollographql.com/docs/link/links/rest/),
which lets you call your REST APIs client-side from within your GraphQL queries - or perhaps as a first step
toward it. Unfortunately, `apollo-link-rest` can't easily support data that is not a pure transform of an API response,
e.g., data in Redux state that is derivative of an API response, but is transformed with inputs
from other pieces of state, or represents the merged state of multiple API calls.

Queries will automatically re-execute whenever state changes to get the latest data.

```ts
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
  const { data } = useReduxQuery<ReduxGQLQuery>(COMP_QUERY);

  return <h1>name: {data?.redux?.name}</h1>;
};
```
