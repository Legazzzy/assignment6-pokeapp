import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {

  constructor(
    private readonly userService: UserService,
  ) { }

  private _trainerName: string | undefined = this.userService.user?.username;
  private _pokemons: Pokemon[] | undefined = this.userService.user?.pokemon;

  get trainerName(): string {
    return this._trainerName!;
  }

  set trainerName(n: string) {
    this._trainerName = n;
  }


  get pokemons(): Pokemon[] {
    return this._pokemons!;
  }

  set pokemons(p: Pokemon[]) {
    this._pokemons = p;
  }

  public handleRemove(pokemonName:string): void {
    let newPokemons:Pokemon[] | undefined = [];
    this.pokemons.forEach(pokemon => {
      if (pokemon.name !== pokemonName) {
        newPokemons?.push(pokemon)
      }
    })
    this._pokemons = newPokemons!;
    this.userService.updatePokemons(this._pokemons);

    this.userService.patchUser(this.userService.user?.id!)
      .subscribe({
        next: (response:any) => {
          console.log('NEXT', response);  
        },
        error: (error: HttpErrorResponse) => {
          console.log('ERROR', error);
        }
      })
  }

  public removePokemon(pokemon: Pokemon): void {

  }


  ngOnInit(): void {
  }

}
