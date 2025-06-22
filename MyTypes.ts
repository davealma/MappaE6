export type PokeTypeResult = {
    next: string | null;
    results: {
        name: string;
        url: string
    }[]
}

export type Pokemon = {
    height: number;
}

export type PokemonType = {
    pokemon: {
        name: string;
        url: string;
    }
}

export type StringMap = {
    [key: string]: string;
}

export type SolutionType = {
    heights: {[key: string]: number}
}