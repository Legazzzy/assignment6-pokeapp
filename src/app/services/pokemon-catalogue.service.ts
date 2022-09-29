import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { PokemonFetch }  from '../models/pokemonFetch.model';
import { HttpClient } from '@angular/common/http';
import { CapitalizedUtil } from '../utils/capitalized.util';
import { StorageUtil } from '../utils/storage.util';
import { StorageKeys } from '../enums/storage-keys.enum';

const { apiPokemons} = environment;

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private _pokemonFetched: PokemonFetch = {
    count: 0,
    next: '',
    previous: '',
    results: [{
      name: '',
      url: ''
    }]
  };
  private _pokemonList: Pokemon[] = [];
  private _pokemons: Pokemon[] = [];
  private _error: string = "";
  private _loading : boolean = false;

  get pokemonsFetched(): PokemonFetch {
    return this._pokemonFetched;
  }

  set pokemonsFetched(p: PokemonFetch) {
    this._pokemonFetched = p;
  }

  get pokemons(): Pokemon[] {
    return this._pokemons;
  }

  set pokemons(p: Pokemon[]) {
    this._pokemons = p;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient) {}

  public findAllPokemons(): void {
    this._loading = true;
    this.http.get<PokemonFetch>(`${apiPokemons}?limit=2000`)
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({   
        next: (pokemons: PokemonFetch) => { 
          this.fetchAllPokemons(pokemons);  
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
      StorageUtil.storageSave(StorageKeys.Pokemon, this.pokemons);
    }


  public fetchAllPokemons(pokemons: PokemonFetch): void {
    this._loading = true;
    pokemons.results.forEach(pokemon => {
      this.http.get<Pokemon>(pokemon.url)
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (pokemonResult: Pokemon) => {
          console.log(pokemonResult);
          this._pokemons.push({
            id: pokemonResult.id,
            name: CapitalizedUtil.capitalized(pokemonResult.name),
            base_experience: pokemonResult.base_experience,
            order: pokemonResult.order,
            height: pokemonResult.height,
            weight: pokemonResult.weight,
            abilities: pokemonResult.abilities,
            sprites: {
              front_default: pokemonResult.sprites.front_default,
              other: {
                dream_world: {
                  front_default: pokemonResult.sprites.other.dream_world.front_default
                }
              }
            }
          })
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
    })
  }
}