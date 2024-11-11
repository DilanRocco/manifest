import { renderGraphiQL } from "@graphql-yoga/render-graphiql";


export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
const url = import.meta.env.VITE_SUPABASE_URL
const test = url + "/graphql/v1"

export default async (req: any, res: any) => {
  res.status(200).end(
    renderGraphiQL({
      endpoint:  test,
      headers: JSON.stringify({
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      }),
      credentials: "omit",
    })
  );
};