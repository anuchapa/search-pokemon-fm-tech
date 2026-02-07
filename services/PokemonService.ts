import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react";

const url: string = "https://graphql-pokemon2.vercel.app/?"

export const client = new ApolloClient({
    link: new HttpLink({ uri: url }),
    cache: new InMemoryCache(),
});

export const GET_ALL_POKEMONS = gql`
        query pokemons($first: Int!){
            pokemons(first: $first){
              id
              number
              name
              image
            }
          }`;


const GET_POKEMON = gql`
        query pokemon($id: String, $name: String){
          pokemon(id: $id, name: $name){
            id
            name
            image
            evolutions{
              id
              number
              name
            }
            attacks{
              fast{
                name
                type
                damage
              }
              special{
                name
                type
                damage
              }
            }
          }
        }`;


export interface Pokemon {
    id: string;
    number: string;
    name: string;
    image: string;
}

export interface PokemonDetail {
    id: string;
    number: string;
    name: string;
    image: string;
    attacks: Attack
    evolutions: Pokemon[]
}

export interface Attack {
    fast: AttackDetail[]
    special: AttackDetail[]
}

export interface AttackDetail {
    name: string
    type: string
    damage: string
}

export function useGetPokemons(fisrt: number) {
    const { data, loading, error } = useQuery<{ pokemons: Pokemon[] }>(GET_ALL_POKEMONS, {
        variables: {
            first: fisrt
        }
    })

    return {
        pokemons: data?.pokemons,
        isLoading: loading,
        isError: error
    };
}

export function useGetPokemonDetail(name: string) {
    const { data, loading, error } = useQuery<{ pokemon: PokemonDetail }>(GET_POKEMON, {
        variables: {
            name: name
        }
    })

    return {
        pokemon: data?.pokemon,
        isLoading: loading,
        isError: error
    };
}