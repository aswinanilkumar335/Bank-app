import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  // Path setting for user defined component
  // login path
  {
    path:'',component:LoginComponent
  },
  // homepage path
  {
    path:'homepage',component:HomePageComponent
  },
  // register path
  {
    path:'register',component:RegisterComponent
  },
  // transaction
  {
    path:'transaction',component:TransactionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
