# redux-graphql

Connect to your Redux state with a React hook that does a client-side GraphQL query
via the lightweight [`graphql-object`](https://www.npmjs.com/package/graphql-object) utility.

⚛️:sunglasses:⚛️

Use Apollo? See [`redux-graphql-apollo`](https://github.com/redux-graphql/blob/master/redux-graphql-apollo/).

This can help as you migrate an existing application from storing API response data in Redux
and accessing through selectors toward fetching it from a GraphQL server via React Hooks.

Queries will automatically re-execute whenever state changes to get the latest data.

## Table of Contents
* [Usage in Components](#UsageinComponents)
* [TypeScript](#TypeScript)

## Usage in Components

Here's how you use the React hook it in a component:

```ts
import * as React from "react";
import gql from "graphql-tag";
import { useReduxQuery } from "redux-graphql-apollo";
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

If you are also using a remote GraphQL server and you want your client schema to extend,
you should use `extend type Query` instead of `type Query`.

## TypeScript

If you want to generate TypeScript types from your Redux GraphQL schema,
you can move your schema to an external file, e.g., `src/graphql/redux.graphql`:

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

Then you can configure webpack `raw-loader` to load in the schema:

```ts
import REDUX_GRAPHQL from './graphql/redux.graphql';

const typeDefs = gql`${REDUX_GRAPHQL}`;

const client = new ApolloClient({
  typeDefs,
  // ...
});
```

And again, if you want to extend a remote GraphQL schema, we'll have to
replace `type Query` with `extend type Query`, but here we want to keepA
the external schema file pure for the TypeScript tooling, so we'll replace at runtime:

```ts
import REDUX_GRAPHQL from './graphql/redux.graphql';

const typeDefs = gql`${REDUX_GRAPHQL.replace('type Query', 'extend type Query')}`;

const client = new ApolloClient({
  typeDefs,
  // ...
});
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
