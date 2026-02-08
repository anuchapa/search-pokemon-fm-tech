import { Pokemon, useGetPokemons } from "@/services/PokemonService"
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchBox({ setPokemons }: {
    setPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>
}) {
    const { pokemons: pokemonBuff } = useGetPokemons(151);
    const [searchValue, setSearchValue] = useState("");
    const router = useRouter()
    const param = useSearchParams();
    const name = param.get("name");

    useEffect(() => {
        if (name)
            setSearchValue(name);
    }, [name]);

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value)
        if (name) {
            router.replace('/')
        }
        if (pokemonBuff && pokemonBuff.length > 0) {
            const filtered = pokemonBuff.filter(p => p.name.toLowerCase().includes(value.toLocaleLowerCase()))
            setPokemons(filtered);
        }
    }

    return (
        <div className="flex justify-center items-center">
            <input
                value={searchValue}
                placeholder="Search..."
                className="input shadow-lg border border-gray-300 px-5 py-3 rounded-xl w-full max-w-[640px] transition-all duration-300 focus:max-w-[680px] outline-none"
                name="search"
                type="search"
                onChange={handleChangeValue}
            />
        </div>
    )
}