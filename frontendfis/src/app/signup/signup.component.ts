import { Component } from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";

import {MatLabel} from "@angular/material/form-field";
import {HeaderComponent} from "../header/header.component";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Zbor} from "../header/Zbor";
import {FormsModule} from "@angular/forms";
import {Utilizator} from "../header/Utilizator";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    HeaderComponent,
    FormsModule,
    NgIf
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user: Utilizator=new Utilizator();
  useri:Utilizator[]=[];
  successMessage: string | null = null;

  constructor(private http: HttpClient,private router:Router) {
  }

  onClick()
  {
    console.log(this.user);
    this.http.post("http://localhost:8080/create/user", this.user).subscribe();
    this.successMessage = 'Rezervare realizată cu succes!';
    setTimeout(() => {
      this.successMessage = null;
    }, 1700);
  }
}
