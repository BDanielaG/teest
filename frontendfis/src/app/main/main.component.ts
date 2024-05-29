import { Component } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {Zbor} from "../header/Zbor";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  standalone: true,
    imports: [
        HeaderComponent,
        NgForOf,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})

export class MainComponent {
  zboruri:Zbor[]=[];
  constructor(private http: HttpClient,private router:Router) {
  }
  ngOnInit()
  {
    console.log("fcuiash");

    this.http.get("http://localhost:8080/getAll/zbor").subscribe(
      (data: any) => {
        this.zboruri = data;
      }
    );

  }
}
