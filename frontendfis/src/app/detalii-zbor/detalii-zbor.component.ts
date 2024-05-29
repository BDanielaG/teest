import { Component } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {Utilizator} from "../header/Utilizator";
import {Zbor} from "../header/Zbor";
import {NgIf} from "@angular/common";
import {Rezervari} from "../header/Rezervari";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-detalii-zbor',
  standalone: true,
  imports: [
    HeaderComponent,
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './detalii-zbor.component.html',
  styleUrl: './detalii-zbor.component.css'
})
export class DetaliiZborComponent {
  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute, private authservice: AuthService) { }
  user: Utilizator = new Utilizator();
  useri: Utilizator[] = [];
  successMessage: string | null = null;

  zbor: Zbor=new Zbor();
  zboruri:Zbor[]=[];
  rezervare: Rezervari= new Rezervari();
  rezervari: Rezervari[]=[];
  // rezerv

  toggleDates(): void {
    const departureDateInput = document.getElementById("search-departure-date") as HTMLInputElement;
    const returnDateInput = document.getElementById("search-return-date") as HTMLInputElement;
    const flightTypeSelect = document.getElementById("search-flight-type") as HTMLSelectElement;

    if (flightTypeSelect.value === "round-trip") {
      departureDateInput.style.display = "inline-block";
      returnDateInput.style.display = "inline-block";
    } else {
      departureDateInput.style.display = "inline-block"; // Afișează data dus și când este selectată doar opțiunea dus
      returnDateInput.style.display = "none";
    }
  }

  realizeazaRezervare() {
    console.log(this.rezervare);
    this.http.post("http://localhost:8080/create/rezervare", this.rezervare).subscribe(
      (response) => {
        console.log('Rezervare realizată cu succes:', response);
        this.successMessage = 'Rezervare realizată cu succes!';
        setTimeout(() => {
          this.successMessage = null;
        }, 1700);
      },
      (error) => {
        console.error('Eroare la realizarea rezervării:', error);
      }
    );
  }
  ngOnInit()
  {

const id_rezervare=this.authservice.id;

    console.log(this.activatedRoute.snapshot.params['id']);

    const id = this.activatedRoute.snapshot.params['id'];
    this.http.get(`http://localhost:8080/getzborById/${id}`).subscribe(
      (data: any) => {
        this.zbor = data;

        this.rezervare.data_plecare=this.zbor.data_plecare;
        this.rezervare.data_sosire=this.zbor.data_sosire;
        this.rezervare.oras_dus=this.zbor.orasdus;
        this.rezervare.oras_intors=this.zbor.destinatie;
        this.rezervare.nr_locuri_adulti=this.zbor.nr_locuri_adulti;
        this.rezervare.nr_locuri_seniori=this.zbor.nr_locuri_seniori;
        this.rezervare.nr_locuri_copii=this.zbor.nr_locuri_copii;
        // this.rezervare.tip_clasa=

      },

      (error: any) => {
        console.error('Error fetching flight data:', error);
      }
    );
  }
}
