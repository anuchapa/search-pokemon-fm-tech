import { PokemonDetail, useGetPokemonDetail, AttackDetail } from "@/services/PokemonService";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";



export function PokemonPage({ name }: { name: string }) {
  const { pokemon: data } = useGetPokemonDetail(name)
  const [pokemon, setpokemon] = useState<PokemonDetail>()
  const router = useRouter()

  useEffect(() => {
    if (data) {
      setpokemon(data as PokemonDetail)
    }
  }, [data]);

  const handleClose = () => {
    router.replace("/");
  }

  if (pokemon) {
    return (
      <div className="grid grid-flow-row gap-4">
        <div className="relative flex justify-center items-center py-4">
          <p className="text-2xl font-bold">{pokemon?.name}</p>
          <button
            onClick={handleClose}
            className="absolute right-0 p-2 bg-gray-100 w-10 h-10 hover:bg-gray-300 rounded-full transition-colors"
          >
            <span className="text-sm font-bold">✕</span>
          </button>
        </div>
        <div className="flex justify-center items-center">
          {pokemon?.image && (<Image
            src={pokemon?.image ?? ""}
            alt={pokemon?.name ?? ""}
            height={150}
            width={150}
            className="w-fit h-auto"
          />)}
        </div>
        <div className="grid grid-flow-col gap-10">
          <div>
            <div>
              Attacks
            </div>
            <div className="grid grid-flow-col gap-10">
              <div>
                <div>
                  Fast
                </div>
                <div className="grid grid-flow-row gap-4">
                  <ul className="list-disc">
                    {
                      pokemon?.attacks.fast && < AttackDetailSection attackDetail={pokemon?.attacks.fast} />
                    }
                  </ul>
                </div>
              </div>
              <div>
                <div>
                  Spacial
                </div>
                <div className="grid grid-flow-row gap-4">
                  <ul className="list-disc">
                    {
                      pokemon?.attacks.special && < AttackDetailSection attackDetail={pokemon?.attacks.special} />
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {pokemon?.evolutions && (
            <div>
              <div>
                Evolutions
              </div>
              <ul className="list-disc">
                {
                  pokemon?.evolutions.map((evo, index) => (
                    <li key={index}>
                      <div>
                        <Link href={`/?name=${evo.name}`}>
                          <div className="underline hover:text-blue-600">
                            {evo.name}
                          </div>
                        </Link>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </div>
          )
          }
        </div>
      </div>
    )
  }

  return (
    <div>
      Loading...
    </div>
  )
}

function AttackDetailSection({ attackDetail }: { attackDetail: AttackDetail[] }) {
  return (<div className="grid grid-flow-row gap-4">
    <ul className="list-disc">
      {
        attackDetail.map((af, index) => (
          <li key={index}>
            <div>
              <div>
                <span className="font-bold">Name:</span> {af.name}
              </div>
              <div>
                <span className="font-bold">Type:</span> {af.type}
              </div>
              <div>
                <span className="font-bold">Damage:</span> {af.damage}
              </div>
            </div>
          </li>
        ))
      }
    </ul>
  </div>)
}