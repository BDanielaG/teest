import { Component } from '@angular/core';
import {MatBadge} from "@angular/material/badge";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {AuthService} from "../auth.service";
import {NgIf} from "@angular/common";

// import {}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatBadge,
    MatButton,
    MatIcon,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  role: string = '';


  ngOnInit()
  {
    this.role = this.authService.Roles;
  }

  isOrganizer()
  {
    // for (let i=0;i<this.securityService.getUser().roles.length;i++) if (this.securityService.getUser().roles[i]=="organizer") return true;
    // if (this.securityService.getUser()!=null) if (this.securityService.getUser().roles=="organizer") return true;
    // return false;
  }
  constructor(private router: Router, private authService:AuthService) { }
  goToLogin() {
    this.router.navigate(['/login']); // Navigate to the login page
  }

  addFlight()
  {
    this.router.navigate(['/add-zbor']);
  }

  goToSignup() {
    this.router.navigate(['/signup']); // Navigate to the signup page
  }

  goToLandingPage(){
    this.router.navigate(['']);
  }

  goToRezervare(){
    this.router.navigate(['/rezervare']);
  }

  goToCart(){
    this.router.navigate(['/shopping']);
  }
}
