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
  rezervare: Rezervari=new Rezervari();
  rezervari: Rezervari[]=[];
  zbor: Zbor=new Zbor();
  zboruri:Zbor[]=[];
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

  validateNumber(event: Event,field: string): void {
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
    this.searchFlights(this.departureCity,this.arrivalCity);
  }



  searchFlights(departureCity: string, arrivalCity: string): void {
    this.http.get<Zbor[]>('http://localhost:8080/getZbor/'+departureCity+'/'+arrivalCity)

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
          // if (data.length === 0) {
          //   this.errorMessage = 'No flights found for the selected route.';
          // }
        }
      );
  }
  // getUser(username: string, parola: string): void {
  //   const url = `http://localhost:8080/getUser/${username}/${parola}`;
  //   this.http.get<Utilizator>(url)
  //     .pipe(
  //       catchError(error => {
  //         console.error('Error:', error);
  //         return of(null); // Return an empty value if there's an error
  //       })
  //     )
  //     .subscribe(
  //       data => {
  //         if (data) {
  //           this.user = data;
  //           this.role = this.user.rol; // Assuming "rol" is the role field in Utilizator
  //           console.log('User:', this.user);
  //           console.log('Role:', this.role);
  //           this.authservice.Roles=this.role;
  //           this.router.navigate(['/main']); // Navigate to different route or do something based on the role
  //         } else {
  //           this.errorMessage = 'User or password incorrect, please try again.';
  //           console.error('User not found or error occurred');
  //         }
  //       }
  //     );
  // }

  constructor(private http: HttpClient,private router:Router) {
  }

  // onClick()
  // {
  //   console.log(this.rezervare);
  //   this.http.post("http://localhost:8080/create/zbor", this.rezervare).subscribe();
  //

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

  // validateAndSearch(): void {
  //   const departureCityInput = document.getElementById("search-departure-city") as HTMLInputElement;
  //   const arrivalCityInput = document.getElementById("search-arrival-city") as HTMLInputElement;
  //   const nameInput = document.getElementById("search-name") as HTMLInputElement;
  //
  //   const departureCity = departureCityInput.value.trim();
  //   const arrivalCity = arrivalCityInput.value.trim();
  //   const name = nameInput.value.trim();
  //
  //   const namePattern = /^[A-Za-z\s]{3,}$/;
  //   const cityPattern = /^[A-Za-z\s]{3,}$/;
  //
  //   if (departureCity === '' || !cityPattern.test(departureCity)) {
  //     alert('Te rugăm să completezi orașul de plecare corect.');
  //     return;
  //   }
  //
  //   if (arrivalCity === '' || !cityPattern.test(arrivalCity)) {
  //     alert('Te rugăm să completezi orașul de sosire corect.');
  //     return;
  //   }
  //
  //   if (name === '' || !namePattern.test(name)) {
  //     alert('Te rugăm să completezi numele corect.');
  //     return;
  //   }
  //   this.searchFlights();
  // }
  //
  // searchFlights(): void {
  //   // Implement the search logic here
  //   console.log('Searching flights...');
  // }

  ngOnInit()
  {

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


  }
