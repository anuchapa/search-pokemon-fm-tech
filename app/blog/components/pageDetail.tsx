import { Pokemon, useGetPokemons } from "@/services/PokemonService";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PokemonPage } from "./pokemanPage";
import { SearchBox } from "./searchBox";
import { PokemonList } from "./pokemonList";

export function PageDetail() {
  const { pokemons: pokemonBuff } = useGetPokemons(151)
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const param = useSearchParams();
  const name = param.get("name");

  useEffect(() => {
    if (pokemonBuff && pokemonBuff.length > 0) {
      setPokemons(pokemonBuff);
    }
  }, [pokemonBuff,name]);


  return (
    <div className="grid grid-rows-[auto_auto_1fr] gap-4 h-screen">
      <div className="max-w-full mx-auto">
        <p className="text-6xl font-mono">search-pokemon-fm-tech</p>
      </div>
      <div className="max-w-full">
        <SearchBox setPokemons={setPokemons} />
      </div>
      <div className="relative overflow-hidden h-full">
        {
          name ? (
            <div className="flex justify-center items-center">
              <PokemonPage name={name} />
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4 h-full content-start overflow-y-auto">
              <PokemonList pokemons={pokemons} />
            </div>
          )
        }
      </div>
    </div>
  )
}