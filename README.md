# use-redux-graphql

> Connect to your Redux state with a GraphQL query client-side via a React Hook.

⚛️:sunglasses:⚛️

This can help as you migrate an existing application from storing API response data in Redux and accessing through selectors toward fetching it from a GraphQL server via React Hooks.

Queries will automatically re-execute whenever state changes to get the latest data.

If you don't use Apollo, see [`use-redux-graphql`](https://github.com/AndersDJohnson/use-redux-graphql/tree/master/packages/use-redux-graphql/README.md)
for full documentation.

Otherwise for Apollo, see [`use-redux-graphql-apollo`](https://github.com/AndersDJohnson/use-redux-graphql/tree/master/packages/use-redux-graphql-apollo/README.md).

Here's a preview:

```tsx
import * as React from "react";
import gql from "graphql-tag";
import { useReduxGraphQuery } from "use-redux-graphql";

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
  const { data } = useReduxGraphQuery(COMP_QUERY);

  return <h1>name: {data?.redux?.name}</h1>;
};
```
