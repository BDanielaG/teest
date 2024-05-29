import {DateRange} from "@angular/material/datepicker";

export class Zbor {
  id:number;
  cod_zbor: number;
  nr_locuri_total: number;
  data_plecare: Date;
  data_sosire: Date;
  nume_companie: string;
  orasdus: string;
  destinatie: string;
  nr_locuri_seniori: number;
  nr_locuri_adulti: number;
  nr_locuri_copii: number;
  pret_economy: number;
  pret_business: number;
  pret_firstclass:number;
  locuri_business: number;
  locuri_economy: number;
  locuri_first: number;
  zile_operare: string;
  discount_retur:number;
  discount_last_minute:number;
}
