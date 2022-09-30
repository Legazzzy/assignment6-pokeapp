import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';
import { StorageUtil } from '../utils/storage.util';

const { apiUsers, apiKey} = environment;

@Injectable({
  providedIn: 'root'
})

/** Service responsible for handling a user, and different actions associated with a user. */
export class UserService {

  /** Constructor, creates an instance of HttpClient */
  constructor(
    private readonly http: HttpClient
  ) { this._user = StorageUtil.storageRead<User>(StorageKeys.User); }

  private _user?:User;
  
  /** Get method for user */
  get user(): User | undefined {
    return this._user;
  }

  /** Set method for user*/
  set user(user: User | undefined) {
    StorageUtil.storageSave<User>(StorageKeys.User, user!);
    this._user = user;
  }

  /** Method used to update a users collection of pokemons.
   * @param pokemons(Pokemon[]) : The updated array of pokemons
   */
  public updatePokemons(pokemons: Pokemon[]): void {
    let newUser:User | undefined = {
      id: this._user?.id!,
      username: this._user?.username!,
      pokemon: pokemons
    }
    this.user = newUser;
    this.patchUser(this.user?.id!)
    .subscribe({
      next: (response:any) => {
        console.log('NEXT', response);  
      },
      error: (error: HttpErrorResponse) => {
        console.log('ERROR', error);
      }
    })
  }

  /**
   * Method used to patch a user with a new updated array of pokemons
   * @param id(number) : The ID of the user we want to patch
   * @returns A observable user object
   */
  public patchUser(id: number): Observable<User | undefined> {
    
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": apiKey
    })

    return this.http.patch<User>(`${apiUsers}/${id}`, {
      pokemon: this._user?.pokemon
    }, { headers } )
  }
}
