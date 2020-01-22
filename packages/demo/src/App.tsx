import * as React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { Provider } from "react-redux";
import { Comp } from "./Comp";
import { store } from "./redux/store";
import { updateName, doNothing, doRandom } from "./redux/actions";
import { client } from "./apollo";
import { testQuery } from "./apollo/testQuery";

const { useState } = React;

testQuery();

export default function App() {
    const [count, setCount] = useState(0);

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Comp />
        <button onClick={updateName}>update name</button>
        <button onClick={doRandom}>do random</button>
        <button onClick={doNothing}>do nothing</button>
        <button onClick={() => setCount(count + 1)}>count: {count}</button>
      </ApolloProvider>
    </Provider>
  );
}
