import { Pokemon } from "../models/pokemon.model";

export const duplicateChecker = (arrayOfPokemon: Pokemon[] | undefined, pokemonToCheck: Pokemon | undefined) => {

    for (let pokemon of arrayOfPokemon!) {
        if (pokemon.id == pokemonToCheck?.id) {
            return false;
        }
    }
    return true;
}