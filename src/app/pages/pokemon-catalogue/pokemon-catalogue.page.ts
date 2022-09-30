import { Component, OnInit } from '@angular/core';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';
import { Pokemon } from 'src/app/models/pokemon.model';
import { StorageUtil } from 'src/app/utils/storage.util';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';

@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.page.html',
  styleUrls: ['./pokemon-catalogue.page.scss']
})

/** Component responsible for containing logic used in the Pokemon catalogue page */
export class PokemonCataloguePage implements OnInit {

  /**
   * Constructor, creates an instance of PokemonCatalogueService.
   * @param pokemonCatalogueService 
   */
  constructor(
    private readonly pokemonCatalogueService: PokemonCatalogueService,
  ) { }

  /** Get method for all available pokemons */
  get pokemons(): Pokemon[] {
    return this.pokemonCatalogueService.pokemons;
  }

  /** Get method for loading state */
  get loading(): boolean {
    return this.pokemonCatalogueService.loading;
  }

  /** Get method for error message */
  get error() : string {
    return this.pokemonCatalogueService.error;
  }

  /**
   * OnInit method that checks if pokemons for the catalogue are already stored in the local storage.
   * If no list of pokemons are stored, fetch pokemons from the API
   */
  ngOnInit(): void {

    const storedPokemon:Pokemon[] | undefined = StorageUtil.storageRead(StorageKeys.Pokemon);

    if (storedPokemon?.length === 0 || storedPokemon === undefined 
        || this.pokemonCatalogueService.pokemons.length === 0) {
      this.pokemonCatalogueService.findAllPokemons();
    }

    this.pokemonCatalogueService.pokemons = StorageUtil.storageRead(StorageKeys.Pokemon)!;
  }

}
