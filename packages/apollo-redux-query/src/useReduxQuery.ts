import { useContext, useEffect } from "react";
import { useQuery, QueryHookOptions } from "@apollo/react-hooks";
import { QueryResult } from "@apollo/react-common";
import { ReactReduxContext } from "react-redux";
import { DocumentNode } from "graphql";

const useReduxQuery = <TData = any, TVariables = Record<string, any>>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> => {
  const { store } = useContext(ReactReduxContext);
  const { refetch, ...rest } = useQuery(query, options);

  useEffect(() => store.subscribe(() => refetch()), [store, refetch]);

  return {
    refetch,
    ...rest
  };
};

export { useReduxQuery };
