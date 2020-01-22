# redux-graphql

Connect to your Redux state with a React hook that does a client-side GraphQL query.

⚛️:sunglasses:⚛️


If you don't use Apollo, see [`redux-graphql`](https://github.com/AndersDJohnson/redux-graphql/tree/master/packages/redux-graphql#readme)
for full documentation.

Otherwise for Apollo, see [`redux-graphql-apollo`](https://github.com/AndersDJohnson/redux-graphql/tree/master/packages/redux-graphql-apollo#readme).

Here's a preview:

```tsx
import * as React from "react";
import gql from "graphql-tag";
import { useReduxQuery } from "redux-graphql";

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
  const { data } = useReduxQuery(COMP_QUERY);

  return <h1>name: {data?.redux?.name}</h1>;
};
```
