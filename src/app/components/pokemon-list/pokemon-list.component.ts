import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
[x: string]: any;

  @Input() pokemons: Pokemon[] = [];


  public pokemonImage=null;
  public name:string="";
  public height:string="";
  public order:string="";

  constructor() { }

  ngOnInit(): void {
  }

  display(p:Pokemon): void {
    this.name = p.name;
    this.height = p.height.toString();
    this.order = p.order.toString();

  

  }
}
