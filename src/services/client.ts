import { createClient } from "@supabase/supabase-js";
import { HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

// Create Supabase client
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

const httpLink = new HttpLink({
  uri: `${import.meta.env.VITE_SUPABASE_URL}/graphql/v1`,
});

const authLink = setContext(async (_, { headers }) => {
  const { data: { session } } = await supabase.auth.getSession();
  
  const token = session?.access_token;

  return {
    headers: {
      ...headers,
      apikey: import.meta.env.VITE_SUPABASE_KEY,
      ...(token && { authorization: `Bearer ${token}` }),
    }
  };
});


export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
