import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from "../../services/login.service";
import {Login} from "../../models/Login.model";
import {Route} from "../constants/route.enum";
import {AuthService} from '../../auth/auth.service';
import jwtDecode, {JwtPayload} from 'jwt-decode';

@Component({
  selector: 'app-loginsingup',
  templateUrl: './loginsingup.component.html',
  styleUrls: ['./loginsingup.component.css']
})
export class LoginsingupComponent{

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor( private loginService: LoginService, private authService: AuthService, private router: Router) {
  }


public login(): void {
        sessionStorage.removeItem("app.token");

        this.authService.login(this.username, this.password)
            .subscribe({
                next: (response) => {
                console.log(response);
                    sessionStorage.setItem("app.token", response.access_token);

                    const decodedToken = jwtDecode<JwtPayload>(response.access_token);
                    // @ts-ignore
                    sessionStorage.setItem("app.roles",  decodedToken.scope);

                    this.router.navigateByUrl("/homepage");
                },
                error: (error) => console.log(error)
            });
    }
}
