import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
[x: string]: any;

  @Input() pokemons: Pokemon[] = [];



  public pokemon:Pokemon|undefined=undefined;

  constructor(public readonly userService: UserService) { }

  ngOnInit(): void {
  }

  display(p:Pokemon): void {
    this.pokemon = p;
  }

  public duplicateChecker = (arrayOfPokemon: Pokemon[] | undefined, pokemonToCheck: Pokemon | undefined) => {

    for (let pokemon of arrayOfPokemon!) {
        if (pokemon.id == pokemonToCheck?.id) {
            return false;
        }
    }
    return true;
}

  public handleAdd(pokemon:Pokemon): void {

      let newPokemons:Pokemon[] | undefined = [...this.userService.user?.pokemon!,pokemon];
      
      if (newPokemons !== undefined) {
        this.userService.updatePokemons(newPokemons);
      }
    } 
}
