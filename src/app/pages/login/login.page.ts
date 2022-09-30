import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})

/** Component responsible for containing logic used in the Login page */
export class LoginPage {

  /**
   * Constructor, creates an instance of Router
   * @param pokemonCatalogueService 
   */
  constructor(private readonly router: Router) { }

  /** Method used to handle login click event. Navigates to the users profile page */
  handleLogin(): void {
    this.router.navigateByUrl("/profile");
  }

}
