import { Component, OnInit } from '@angular/core';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';
import { Pokemon } from 'src/app/models/pokemon.model';
import { StorageUtil } from 'src/app/utils/storage.util';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.page.html',
  styleUrls: ['./pokemon-catalogue.page.scss']
})
export class PokemonCataloguePage implements OnInit {

  get pokemons(): Pokemon[] {
    return this.pokemonCatalogueService.pokemons;
  }

  get loading(): boolean {
    return this.pokemonCatalogueService.loading;
  }

  get error() : string {
    return this.pokemonCatalogueService.error;
  }

  constructor(
    private readonly pokemonCatalogueService: PokemonCatalogueService,
    private readonly userService: UserService
  ) { }

  ngOnInit(): void {
    const storedPokemon:Pokemon[] | undefined = StorageUtil.storageRead(StorageKeys.Pokemon);
    if (storedPokemon?.length === 0 || storedPokemon === undefined) {
      this.pokemonCatalogueService.findAllPokemons();
    }
    this.pokemonCatalogueService.pokemons = StorageUtil.storageRead(StorageKeys.Pokemon)!;
  }

}
