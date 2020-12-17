import { Cache, QueryInput } from "@urql/exchange-graphcache";

export function customUpdateQuery<Result, Query>(
  cache: Cache,
  queryinput: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query //Query on output refers to the generic type 'Query' especified at the
) {
  return cache.updateQuery(queryinput, data => fn(result, data as any) as any);
}
