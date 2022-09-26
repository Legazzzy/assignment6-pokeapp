import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { PokemonCataloguePage } from './pages/pokemon-catalogue/pokemon-catalogue.page';
import { ProfilePage } from './pages/profile/profile.page';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/login"
  },
  {
    path: "login",
    component: LoginPage
  },
  {
    path: "pokemons",
    component: PokemonCataloguePage
  },
  {
    path: "profile",
    component: ProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
