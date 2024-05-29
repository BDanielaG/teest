import { Component } from '@angular/core';
import {Rezervari} from "../header/Rezervari";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HeaderComponent} from "../header/header.component";
import {Zbor} from "../header/Zbor";
import {NgForOf} from "@angular/common";
import {NgIf} from "@angular/common";
import {Utilizator} from "../header/Utilizator";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-rezervari',
  standalone: true,
  imports: [
    FormsModule,
    HeaderComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './rezervari.component.html',
  styleUrl: './rezervari.component.css'
})
export class RezervariComponent {
  rezervare: Rezervari = new Rezervari();
  rezervari: Rezervari[] = [];
  zbor: Zbor = new Zbor();
  zboruri: Zbor[] = [];
  departureCity: string;
  arrivalCity: string;
  children: number;
  adults: number;
  seniors: number;
  name: string;
  selectedClass: string;
  flightType: string;
  departureDate: string;
  returnDate: string;
  errorMessage: string;
  departureCityError: string;
  arrivalCityError: string;
  nameError: string;
  childrenError: string;
  adultsError: string;
  seniorsError: string;
  noFlightsFound: boolean = false; // Flag to indicate no flights found

  validateText(event: Event, field: string): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const regex = /^[a-zA-Z\s]*$/; // Only letters and spaces

    if (!regex.test(value)) {
      switch (field) {
        case 'departureCity':
          this.departureCityError = 'This field can only contain letters.';
          break;
        case 'arrivalCity':
          this.arrivalCityError = 'This field can only contain letters.';
          break;
        case 'name':
          this.nameError = 'This field can only contain letters.';
          break;
      }
    } else {
      // Clear the error message if input is valid
      switch (field) {
        case 'departureCity':
          this.departureCityError = '';
          break;
        case 'arrivalCity':
          this.arrivalCityError = '';
          break;
        case 'name':
          this.nameError = '';
          break;
      }
    }
  }

  validateNumber(event: Event, field: string): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const regex = /^[0-9]*$/; // Only numbers

    if (!regex.test(value)) {
      switch (field) {
        case 'children':
          this.childrenError = 'This field can only contain numbers.';
          break;
        case 'adults':
          this.adultsError = 'This field can only contain numbers.';
          break;
        case 'seniors':
          this.seniorsError = 'This field can only contain numbers.';
          break;
      }
    } else {
      // Clear the error message if input is valid
      switch (field) {
        case 'children':
          this.childrenError = '';
          break;
        case 'adults':
          this.adultsError = '';
          break;
        case 'seniors':
          this.seniorsError = '';
          break;
      }
    }
  }

  validateAndSearch(): void {
    if (!this.departureCity || !this.arrivalCity || !this.name) {
      this.errorMessage = "Please fill in all required fields.";
      return;
    }

    if (this.children < 0 || this.adults < 0 || this.seniors < 0) {
      this.errorMessage = "Please enter valid numbers for passengers.";
      return;
    }

    // Add more validations if needed

    // If all validations pass
    this.errorMessage = "";
    this.searchFlights(this.departureCity, this.arrivalCity);
  }

  searchFlights(departureCity: string, arrivalCity: string): void {
    this.http.get<Zbor[]>('http://localhost:8080/getZbor/' + departureCity + '/' + arrivalCity)
      .pipe(
        catchError(error => {
          console.error('Error:', error);
          this.errorMessage = 'An error occurred while fetching flights. Please try again later.';
          return of([]); // Return an empty array if there's an error
        })
      )
      .subscribe(
        data => {
          this.zboruri = data;
          if (data.length === 0) {
            this.noFlightsFound = true; // Set the flag to true if no flights are found
          } else {
            this.noFlightsFound = false; // Reset the flag if flights are found
          }
        }
      );
  }

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

  constructor(private http: HttpClient, private router: Router) {
    this.selectedNumber = this.numbers[0];
  }

  numbers: number[] = Array.from({ length: 50 }, (_, i) => i + 1); // Generates numbers 1 to 50
  selectedNumber: number;

  ngOnInit() {
    this.http.get("http://localhost:8080/getAll/rezervare").subscribe(
      (data: any) => {
        this.rezervari = data;
      }
    );

    this.http.get("http://localhost:8080/getAll/zbor").subscribe(
      (data: any) => {
        this.zboruri = data;
      }
    );
  }

  openFlight(id: number) {
    this.router.navigateByUrl("/create/rezervare/" + id);
  }
}
