import { Pokemon } from "./pokemon.model";

/** Interface that defines a User object */
export interface User {
    id: number;
    username: string;
    pokemon: Pokemon[];
}