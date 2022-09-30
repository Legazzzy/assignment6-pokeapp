import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})

/** component responsible for handling displaying of pokemon and adding to your collection */
export class PokemonListComponent implements OnInit {
[x: string]: any;

  @Input() pokemons: Pokemon[] = [];

  public pokemon:Pokemon|undefined=undefined;

  /** Constructor, creates an instance of UserService and PokemonCatalogueService */
  constructor(
    public readonly userService: UserService,
    public readonly pokemonCatalogue: PokemonCatalogueService) { }

  ngOnInit(): void {
  }

  display(p:Pokemon): void {
    this.pokemon = p;
  }
  /** Check for duplicates */
  public duplicateChecker = (arrayOfPokemon: Pokemon[] | undefined, pokemonToCheck: Pokemon | undefined) => {
    /** loop through all pokemons in list */
    for (let pokemon of arrayOfPokemon!) {
      /** If selected pokemon has the same id as another pokemon, it is a duplicate */
        if (pokemon.id == pokemonToCheck?.id) {
            return false;
        }
    }
    return true;
}

/** Handle add pokemon to collection request*/
  public handleAdd(pokemon:Pokemon): void {
      
      let newPokemons:Pokemon[] | undefined = [...this.userService.user?.pokemon!,pokemon];
      /** If new pokemon isn't undefined, it means there is a new pokemon, update pokemons */
      if (newPokemons !== undefined) {
        this.userService.updatePokemons(newPokemons);
      }
    } 
}
