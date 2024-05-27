import { Component } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {Zbor} from "../header/Zbor";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-zbor',
  standalone: true,
  imports: [
    HeaderComponent,
    MatLabel,
    MatHint,
    MatDatepickerToggle,
    MatDatepicker,
    MatFormField,
    MatIcon,
    MatButton,
    MatInput,
    MatDatepickerInput,
    FormsModule
  ],
  templateUrl: './add-zbor.component.html',
  styleUrl: './add-zbor.component.css'
})
export class AddZborComponent {
 zbor: Zbor=new Zbor();
 zboruri:Zbor[]=[];

  constructor(private http: HttpClient,private router:Router) {
  }

  onClick()
  {
    console.log(this.zbor);
    this.http.post("http://localhost:8080/create/zbor", this.zbor).subscribe();
    this.zboruri.push(this.zbor);
  }

  ngOnInit()
  {

    this.http.get("http://localhost:8080/getAll/zbor").subscribe(
      (data: any) => {
        this.zboruri = data;
      }
    );
  }
}
