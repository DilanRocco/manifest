import { createClient } from "@supabase/supabase-js";
import { useQuery, gql, HttpLink, ApolloClient, InMemoryCache } from "@apollo/client"
import { setContext } from '@apollo/client/link/context';


export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)




const httpLink = new HttpLink({
  uri: `${import.meta.env.VITE_SUPABASE_URL}/graphql/v1`,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_STR);
  return {
    headers: {
      apikey: import.meta.env.VITE_SUPABASE_KEY,
      ...headers,
      ...(token && { authorization: `Bearer ${token}` }),
    }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

