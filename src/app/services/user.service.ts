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
export class UserService {

  private _user?:User;
  
  get user(): User | undefined {
    return this._user;
  }

  set user(user: User | undefined) {
    StorageUtil.storageSave<User>(StorageKeys.User, user!);
    this._user = user;
  }

  public updatePokemons(pokemons: Pokemon[]): void {
    if (pokemons !== this._user?.pokemon) {
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
  }

  public patchUser(id: number): Observable<any> {
    
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": apiKey
    })

    return this.http.patch<User>(`${apiUsers}/${id}`, {
      pokemon: this._user?.pokemon
    }, { headers } )
  }
  

  constructor(
    private readonly http: HttpClient
  ) { 
    this._user = StorageUtil.storageRead<User>(StorageKeys.User);
   }
}
