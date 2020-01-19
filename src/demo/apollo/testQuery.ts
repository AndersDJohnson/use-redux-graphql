import gql from "graphql-tag";
import { client } from ".";

export const testQuery = () =>
  client
    .query({
      query: gql`
        query MyQuery {
          redux @client {
            name
            place {
              kind
            }
            nested {
              place {
                kind
              }
            }
          }
          rates(currency: "USD") {
            currency
          }
        }
      `
    })
    .then(result => console.log(result));
