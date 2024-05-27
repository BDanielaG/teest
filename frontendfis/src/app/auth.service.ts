import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Roles: string;
  Loggedin: boolean;
  constructor() { }
}
