import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
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

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
  }

  display(p:Pokemon): void {
    this.pokemon = p;
  }

  public handleAdd(pokemon:Pokemon): void {
    let newPokemons:Pokemon[] | undefined = [...this.userService.user?.pokemon!,pokemon];
    
    if (newPokemons !== undefined) {
      this.userService.updatePokemons(newPokemons);
    }
  }
}
