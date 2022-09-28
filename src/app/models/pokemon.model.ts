export interface Pokemon {
    id: string;
    name: string;
    base_experience: number;
    order: number;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
        other: {
            dream_world: {
                front_default: string;
            }
        }
    };
}
