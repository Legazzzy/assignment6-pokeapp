import { Component } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
/**
 * Component responsible for containing logic used in profile page component
 */
export class ProfilePage {

  //Constructor, creates an instance of UserService
  constructor(
    private readonly userService: UserService,
  ) { }

  //Private variable used to store the users name
  private _trainerName: string | undefined = this.userService.user?.username;
  //Private variable used to store all the pokemon in the users collection
  private _pokemons: Pokemon[] | undefined = this.userService.user?.pokemon;


  //Get method for users name
  get trainerName(): string {
    return this._trainerName!;
  }

  //Set method for the users name
  set trainerName(n: string) {
    this._trainerName = n;
  }


  //Get method for the users pokemon collection
  get pokemons(): Pokemon[] {
    return this._pokemons!;
  }

  //Set method for the users pokemon collection
  set pokemons(p: Pokemon[]) {
    this._pokemons = p;
  }


  /**
   * Method used to handle remove pokemon click event. Will remove a given pokemon from the users collection
   * @param pokemonName(string) : Parameter of the name of the pokemon the user want to remove 
   */
  public handleRemove(pokemonName:string): void {
    let newPokemons:Pokemon[] | undefined = [];
    this.pokemons.forEach(pokemon => {
      if (pokemon.name !== pokemonName) {
        newPokemons?.push(pokemon)
      }
    })
    this._pokemons = newPokemons!;
    this.userService.updatePokemons(this._pokemons);
  }
}
