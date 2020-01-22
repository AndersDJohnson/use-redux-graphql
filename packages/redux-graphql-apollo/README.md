# redux-graphql-apollo

Connect to your Redux state with a React Hook that does a client-side GraphQL query via Apollo.

⚛️:sunglasses:⚛️

Don't use Apollo? See [`redux-graphql`](https://github.com/AndersDJohnson/redux-graphql/tree/master/packages/redux-graphql#readme).

This can help as you migrate an existing application from storing API response data in Redux
and accessing through selectors toward fetching it from a GraphQL server via React Hooks.

Queries will automatically re-execute whenever state changes to get the latest data.

## Table of Contents
* [Usage in Components](#UsageinComponents)
* [Configure Apollo Client](#ConfigureApolloClient)
* [TypeScript](#TypeScript)
* [`apollo-link-rest`](#apollo-link-rest)

## Usage in Components

Here's how you use the React Hook it in a component:

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
  const { data, error, loading } = useReduxQuery<ReduxGQLQuery>(COMP_QUERY);

  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>

  return <h1>name: {data?.redux?.name}</h1>;
};
```

## Configure Apollo Client

Here's how you configure the resolver with Apollo client:

```ts
import { makeResolver } from "redux-graphql-apollo";

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
  
  type Query {
    redux: Redux
  }
`;

const resolvers = {
  Query: {
    redux: makeResolver({ store })
  }
};

export const client = new ApolloClient({
  resolvers,
  typeDefs,
  // ...
});
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

## `apollo-link-rest`

This can pair nicely with [`apollo-link-rest`](https://www.apollographql.com/docs/link/links/rest/),
which lets you call your REST APIs client-side from within your GraphQL queries - or perhaps as a first step
toward it. Unfortunately, `apollo-link-rest` can't easily support data that is not a pure transform of an API response,
e.g., data in Redux state that is derivative of an API response, but is transformed with inputs
from other pieces of state, or represents the merged state of multiple API calls.
