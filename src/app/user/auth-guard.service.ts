import { Injectable } from "@angular/core";
import {  } from "@angular/router/src/interfaces";
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanLoad, Route, Router } from "@angular/router";

import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate, CanLoad{
    constructor(private authService: AuthService,
                private router: Router){
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkLoggedIn(state.url);
    }

    canLoad(route: Route): boolean {
        return this.checkLoggedIn(route.path);
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