import { Injectable } from '@angular/core';
import { CanActivate,Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TbcsqlService } from './tbcsql.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  successLogin:boolean = false;

  constructor(private router: Router,private sql:TbcsqlService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.successLogin){
        return true;
      }else{
        this.router.navigate(['login']);
        return false;
      }
  }

  login():void{
    this.successLogin = true;
  }

  logout():void{
    window.localStorage.removeItem('accountid');
    window.localStorage.removeItem('logintime');
    window.localStorage.removeItem('token');
    this.successLogin = false;
    this.router.navigate(['login']);
  }
  
}
