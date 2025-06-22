import type { Pokemon, PokemonType, PokeTypeResult, StringMap } from "./MyTypes.ts";

export async function GetTypes(url: string): Promise<PokeTypeResult> {
    const resp = await fetch(url);
    if(!resp.ok) {
        throw Error(`Error: ${resp.statusText}`);
    }
    const pokemonTypes = await resp.json();
    return pokemonTypes;        
}

export async function GetPokemonsFromType(url: string): Promise<PokemonType[]> {
    const resp = await fetch(url);
    if (!resp.ok) {
        throw Error(`Error: ${resp.statusText}`);
    }
    const pokemons = await resp.json();

    return pokemons.pokemon
}

export async function GetPokemonHeight(url: string): Promise<Pokemon> {
    const resp = await fetch(url);
    if (!resp.ok) {
        throw Error(`Error: ${resp.statusText}`);
    }
    const data = await resp.json();
    return {height: data.height};
}

export async function countPokemons(array: PokemonType[]): Promise<number> {
        let totalHeight = 0
        for (const item of array) {
            const url = item.pokemon.url
            const pokemonHeight = await GetPokemonHeight(url);
            totalHeight += pokemonHeight.height
        }
    return totalHeight;
}

export async function GetAvgHeight(result: StringMap): Promise<{[key: string]: number}> {
    const finalResult = {};
        for (const key in result) {
        console.log(`Working with type: ${key}`)

        if (Object.prototype.hasOwnProperty.call(result, key)) {
            const element = result[key];
        
            const data = await GetPokemonsFromType(element);
            const pokemonNums = data.length;
            const totalHeight = await countPokemons(data)
            var avg = totalHeight/pokemonNums;
            if (!isNaN(avg)) {
                finalResult[key] = parseFloat(avg.toFixed(3));
            }
            
        }
    }

    return finalResult;
}