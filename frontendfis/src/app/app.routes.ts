import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {AddZborComponent} from "./add-zbor/add-zbor.component";
import {RezervariComponent} from "./rezervari/rezervari.component";
import {MainComponent} from "./main/main.component";
import {DetaliiZborComponent} from "./detalii-zbor/detalii-zbor.component";

export const routes: Routes = [
  {path:'',component:MainComponent},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'add-zbor',component:AddZborComponent},
  {path:'rezervare',component:RezervariComponent},
  {path:'main',component:MainComponent},
  {path:'detalii-zbor',component:DetaliiZborComponent},
  {path:'create/rezervare/:id',component:DetaliiZborComponent}
];
