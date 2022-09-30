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

/** Service responsible for handling the Pokemon catalogue, and different actions associated with it. */
export class PokemonCatalogueService {


  /** Constructor, creates an instance of HttpClient */
  constructor(private readonly http: HttpClient) {}

  /** PokemonFetch object used to store a response from a pokemons fetch request  */
  private _pokemonFetched: PokemonFetch = {
    count: 0,
    next: '',
    previous: '',
    results: [{
      name: '',
      url: ''
    }]
  };

  /** Pokemon Array used to store all pokemon being fetched */
  private _pokemons: Pokemon[] = [];

  /** String used to store a error message from API request */
  private _error: string = "";

  /** Boolean used to determin if a API request is loading */
  private _loading : boolean = false;

  /** Hashmap used to store the animated pokemon sprites */
  public animatedSprites = new Map();


  /** Get method for pokemonsFetched */
  get pokemonsFetched(): PokemonFetch { return this._pokemonFetched; }

  /** Set method for pokemonsFetched */
  set pokemonsFetched(p: PokemonFetch) { this._pokemonFetched = p; }


  /** Get method for pokemons */
  get pokemons(): Pokemon[] { return this._pokemons; }

  /** Set method for pokemons */
  set pokemons(p: Pokemon[]) { this._pokemons = p; }


  /** Get method for error */
  get error(): string { return this._error; }

  /** Get method for loading */
  get loading(): boolean { return this._loading; }


  /** Method used to add a animated pokemon sprite to the hash map 
   * @param pokemon : Pokemon to be added
   */
  public populateAnimatedMap (pokemon: Pokemon) {
    this.animatedSprites.set(pokemon.id, 
                             pokemon.sprites.versions['generation-v']['black-white'].animated.front_default);
  }


  /** Method used to fetch a object of pokemons via API request */
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


  /** Method used to fetch pokemons via API request */
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
          if (pokemonResult.sprites.versions['generation-v']['black-white'].animated.front_default !== null) {
            this.populateAnimatedMap(pokemonResult);
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
                },
                versions: {
                  'generation-v': {
                      'black-white': {
                          animated: {
                            front_default: pokemonResult.sprites.versions['generation-v']['black-white'].animated.front_default
                          }
                      }
                  }
              }
              }
            })
          }
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
    })
  }
}