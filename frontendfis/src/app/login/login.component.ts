import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Utilizator } from "../header/Utilizator";
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {HeaderComponent} from "../header/header.component";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    HeaderComponent,
    FormsModule,
    NgIf
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: Utilizator = new Utilizator();
  useri: Utilizator[] = [];
  username: string = '';
  parola: string = '';
  role: string = '';
  errorMessage: string = '';
  loggedin:boolean;

  constructor(private http: HttpClient, private router: Router, private authservice: AuthService) { }

  ngOnInit(): void {
    this.http.get<Utilizator[]>("http://localhost:8080/getAll/user").subscribe(
      data => {
        this.useri = data;
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  getUser(username: string, parola: string): void {
    const url = `http://localhost:8080/getUser/${username}/${parola}`;
    this.http.get<Utilizator>(url)
      .pipe(
        catchError(error => {
          console.error('Error:', error);
          return of(null); // Return an empty value if there's an error
        })
      )
      .subscribe(
        data => {
          if (data) {
            this.user = data;
            this.loggedin=true;
            this.role = this.user.rol; // Assuming "rol" is the role field in Utilizator
            console.log('User:', this.user);
            console.log('Role:', this.role);
            this.authservice.Roles=this.role;
            this.router.navigate(['/main']);
            this.authservice
          } else {
            this.errorMessage = 'User or password incorrect, please try again.';
            console.error('User not found or error occurred');
          }
        }
      );
  }

  onSubmit(): void {
    this.getUser(this.username, this.parola);
  }
}
