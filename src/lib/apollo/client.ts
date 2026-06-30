import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { registerApolloClient } from "@apollo/client-integration-nextjs";

const endpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT;

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: endpoint || "https://example.com/graphql",
      fetchOptions: {
        next: {
          revalidate: 300,
        },
      },
    }),
  });
});
