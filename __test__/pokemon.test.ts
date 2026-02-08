import { client, GET_ALL_POKEMONS, GET_POKEMON, Pokemon, PokemonDetail } from "@/services/PokemonService";


async function getAllPokemons() {
    try {
        const response = await client.query<{ pokemons: Pokemon[] }>({
            query: GET_ALL_POKEMONS,
            variables: { first: 151 }
        });

        return response.data?.pokemons as Pokemon[];
    } catch (error) {
        console.error("Error fetching pokemons:", error);
        return null;
    }
}

async function getPokemonDetail(name: string) {
    try {
        const response = await client.query<{ pokemon: PokemonDetail }>({
            query: GET_POKEMON,
            variables: { name: name }
        });

        return response.data?.pokemon as PokemonDetail;
    } catch (error) {
        console.error("Error fetching pokemons:", error);
        return null;
    }
}


const mock = [
    ["Bulbasaur", ["Grass", "Poison"]],
    ["Charmander", ["Fire"]],
    ["Squirtle", ["Water"]],
]

describe(("test get pokemon"), () => {
    test.each(mock)("Enter %s expect Type %s", async (name, expectedType) => {
        const found = await getPokemonDetail(name);
        expect(found?.types).toEqual(expectedType);
    });


    let data: Pokemon[];
    beforeAll(async () => {
      data = await getAllPokemons();
    });

    test.each(mock)("filter name %s", async (name) => {
        if (data && data.length > 0) {
            const filtered = data.filter(p => p.name.toLowerCase().includes(name.toLocaleLowerCase()))
            console.log(Array.isArray(data))
            expect(filtered[0]?.name).toEqual(name);
        }
    });
});