import { useContext, useEffect, useState } from "react";
import { ReactReduxContext } from "react-redux";
import graphql from "graphql-object";
import { DocumentNode } from "graphql"; // dev-only for types

const useReduxGraphQuery = <TData = any>(
  query: DocumentNode
): { data?: TData } => {
  const { store } = useContext(ReactReduxContext);
  const [data, setData] = useState();

  useEffect(() => {
    setData(graphql({redux: store.getState()}, query))

    return store.subscribe(() =>
      setData(graphql({redux: store.getState()}, query))
    );
  }, [store, setData]);

  return {
    data
  };
};

export { useReduxGraphQuery };
