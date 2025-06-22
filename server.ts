import { GetAvgHeight, GetTypes } from "./pokedexApi.ts";
import { PostSolution } from "./solutionApi.ts";


let url: string|null = 'https://pokeapi.co/api/v2/type/'
const result = {};
console.log('Calculating pokemons')
do {
    const types = await GetTypes(url);
    url = types.next;
    // logic for types
    types.results.forEach(async r => {
        result[r.name] = r.url;
    });
} while (url != null);


const keys = Object.keys(result);
keys.sort((a,b) => a.localeCompare(b))
const sortedResult = {};
for (const el of keys) {
    sortedResult[el] = result[el]
}

const heights = await GetAvgHeight(sortedResult)
const finalResult = {heights};

PostSolution(finalResult)


