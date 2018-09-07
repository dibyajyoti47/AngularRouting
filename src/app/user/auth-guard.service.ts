import { Injectable } from "@angular/core";
import {  } from "@angular/router/src/interfaces";
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from "@angular/router";

import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService: AuthService,
                private router: Router){
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkLoggedIn(state.url);
    }
    checkLoggedIn(url: string):boolean {
        this.authService.redirectUrl = url;
        if(this.authService.isLoggedIn()){
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}