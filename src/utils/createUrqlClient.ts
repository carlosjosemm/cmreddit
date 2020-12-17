import { dedupExchange, fetchExchange, } from 'urql';
import {cacheExchange} from "@urql/exchange-graphcache"
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from '../generated/graphql';
import { customUpdateQuery } from './customUpdateQuery';


export const createUrqlClient = (ssrExchange: any) => ({
    url: 'http://localhost:4000/graphql',
    fetchOptions: {
      credentials:"include" as const, //with included credentials you must have set up cors at server-side.
    },                               //credentials value is cast as 'const' to be acceptable at index.tsx
    exchanges: [dedupExchange, cacheExchange({
      updates: {
        Mutation: { 
          //here goes the updates for the different mutations declared
          logout:(mutResult, args, cache, info) => {
            customUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              {query: MeDocument},
              mutResult,
              () => ({myself: null})
            )
          },
  
          login: (mutResult, args, cache, info) => {
            customUpdateQuery<LoginMutation, MeQuery>(
              cache, 
              {query: MeDocument},
              mutResult,
              (result, query) => {
                if (result.login.errors) {
                  return query 
                } else {
                  return {
                    myself: result.login.user
                  };
                }
              }
            );
          },
  
          register: (mutResult, args, cache, info) => {
            customUpdateQuery<RegisterMutation, MeQuery>(
              cache, 
              {query: MeDocument},
              mutResult,
              (result, query) => {
                if (result.register.errors) {
                  return query 
                } else {
                  return {
                    myself: result.register.user
                  };
                }
              }
            );
          }
        }
      }
    }), 
    ssrExchange, 
    fetchExchange]
});