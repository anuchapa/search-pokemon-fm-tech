import { Pokemon } from "@/services/PokemonService";
import Link from "next/link";
import Image from "next/image";


export function PokemonList({ pokemons }: { pokemons: Pokemon[] }) {

  return (
    pokemons.map((pokemon) => (
      <Link key={pokemon.id} href={`/blog?name=${pokemon.name}`} className="group">
        <div className="relative h-24 border-2 rounded-sm p-8 shadow-lg flex gap-2 justify-center items-center">
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
          <div>
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              height={20}
              width={20}
              className="w-full h-auto"
            />
          </div>
          <div>
            {pokemon.name}
          </div>
        </div>
      </Link>
    ))
  )
}