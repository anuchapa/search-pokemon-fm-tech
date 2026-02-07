"use client"

import { client} from "@/services/PokemonService";
import { ApolloProvider } from "@apollo/client/react";
import { PageDetail } from "./components/pageDetail";



export default function Page() {
  return (
    <ApolloProvider client={client}>
      <PageDetail />
    </ApolloProvider>
  )
}


