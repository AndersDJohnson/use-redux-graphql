# use-redux-graphql

Connect to your Redux state with a React Hook that does a client-side GraphQL query
via the lightweight [`graphql-object`](https://www.npmjs.com/package/graphql-object) utility.

⚛️:sunglasses:⚛️

Use Apollo? See [`use-redux-graphql-apollo`](https://github.com/AndersDJohnson/use-redux-graphql/tree/master/packages/use-redux-graphql-apollo#readme).

This can help as you migrate an existing application from storing API response data in Redux
and accessing through selectors toward fetching it from a GraphQL server via React Hooks.

Queries will automatically re-execute whenever state changes to get the latest data.

## Table of Contents
* [Usage in Components](#usage-in-components)
* [TypeScript](#typescript)

## Usage in Components

Here's how you use the React Hook in a component:

```tsx
import * as React from "react";
import gql from "graphql-tag";
import { useReduxGraphQuery } from "use-redux-graphql";
import { ReduxGQLQuery } from "./__generated__/reduxGQL"; // types

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

  return <h1>name: {data?.redux?.name}</h1>;
};
```

## TypeScript

If you want to generate TypeScript types from a Redux GraphQL schema you maintain,
you can write a schema in an external file, e.g., `src/graphql/redux.graphql`:

```graphql
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

type Query {
  redux: Redux
}
```

And here's how you can build the types:

```shell
mkdir -p src/__generated__
```
```shell
npm install --save-dev graphql-schema-typescript
```
```shell
npx graphql-schema-typescript generate-ts src/graphql --typePrefix ReduxGQL --output src/__generated__/reduxGQL.d.ts
```

You can add that last command to a `build:types:graphql` script in your `package.json`.
