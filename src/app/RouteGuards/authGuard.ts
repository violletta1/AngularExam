import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { UsersService } from "../users/users.service";
import { map, Observable } from "rxjs";

export const canActivate = (
    router:ActivatedRouteSnapshot,
    state:RouterStateSnapshot
    ): boolean | UrlTree |Promise<boolean| UrlTree> | Observable<boolean | UrlTree>=> {
        const authService = inject(UsersService);
        const route = inject(Router)
        return authService.currentUser$.pipe(map((user)=>{
            const loggedIn =  user ? true : false;
            if(loggedIn){
                return true;
            }else{
                return route.createUrlTree(['/login']);
            }
        }))
}