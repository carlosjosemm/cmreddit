import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import React from 'react';
// import { createClient, Provider, dedupExchange, fetchExchange, } from 'urql';
import theme from '../theme';
// import {cacheExchange} from "@urql/exchange-graphcache"
// import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from '../generated/graphql';
// import { customUpdateQuery } from '../utils/customUpdateQuery';

// URQL CLIENT CREATION IS COMMENTED OUT, MIGRATED TO SEPARATED FILE TO BE CALLED WHEN SETTING UP SERVER-RENDERING

// const client = createClient({
//   url: 'http://localhost:4000/graphql',
//   fetchOptions: {
//     credentials:"include", //with included credentials you must have set up cors at server-side
//   },
//   exchanges: [dedupExchange, cacheExchange({
//     updates: {
//       Mutation: { 
//         //here goes the updates for the different mutations declared
//         logout:(mutResult, args, cache, info) => {
//           customUpdateQuery<LogoutMutation, MeQuery>(
//             cache,
//             {query: MeDocument},
//             mutResult,
//             () => ({myself: null})
//           )
//         },

//         login: (mutResult, args, cache, info) => {
//           customUpdateQuery<LoginMutation, MeQuery>(
//             cache, 
//             {query: MeDocument},
//             mutResult,
//             (result, query) => {
//               if (result.login.errors) {
//                 return query 
//               } else {
//                 return {
//                   myself: result.login.user
//                 };
//               }
//             }
//           );
//         },

//         register: (mutResult, args, cache, info) => {
//           customUpdateQuery<RegisterMutation, MeQuery>(
//             cache, 
//             {query: MeDocument},
//             mutResult,
//             (result, query) => {
//               if (result.register.errors) {
//                 return query 
//               } else {
//                 return {
//                   myself: result.register.user
//                 };
//               }
//             }
//           );
//         }
//       }
//     }
//   }), fetchExchange]
// });

function MyApp({ Component, pageProps }) {
  return (
    // <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    //  </Provider> 
  )
}

export default MyApp
