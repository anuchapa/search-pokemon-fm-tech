"use client"

import { client } from "@/services/PokemonService";
import { ApolloProvider } from "@apollo/client/react";
import { PageDetail } from "./components/pageDetail";
import { Suspense } from "react";



export default function Page() {
  return (
    <ApolloProvider client={client}>
      <Suspense fallback={<div>Loading Search...</div>}>
        <PageDetail />
      </Suspense>
    </ApolloProvider>
  )
}


