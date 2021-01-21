import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabbarComponent } from './tabbar/tabbar.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path:'login', component:LoginComponent },
  { path:'tabbar', component:TabbarComponent, canActivate:[AuthGuard] },
  { path:'**', redirectTo:'login', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
