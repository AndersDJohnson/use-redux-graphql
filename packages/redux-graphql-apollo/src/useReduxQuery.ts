import { useContext, useEffect } from "react";
import { useQuery, QueryHookOptions } from "@apollo/react-hooks";
import { ReactReduxContext } from "react-redux";
import { QueryResult } from "@apollo/react-common"; // dev-only for types
import { DocumentNode } from "graphql"; // dev-only for types

const useReduxQuery = <TData = any>(
  query: DocumentNode,
  options?: QueryHookOptions<TData>
): QueryResult<TData> => {
  const { store } = useContext(ReactReduxContext);
  const { refetch, ...rest } = useQuery(query, options);

  useEffect(() => store.subscribe(() => refetch()), [store, refetch]);

  return {
    refetch,
    ...rest
  };
};

export { useReduxQuery };
