import { Injectable } from '@angular/core';
import { IProductionCountry } from '../models/interfaces/production-country';
import { IRoProductionCompany } from '../models/interfaces/response-objects/ro-producing-company';
import { IRoProductionCountry } from '../models/interfaces/response-objects/ro-production-country';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  constructor() { }

  setProductionCompanies(companies: IRoProductionCompany[]): string[] {
    return companies.map((company: IRoProductionCompany) => {
      return company.name
    })
  }

  setProductionCountries(countries: IRoProductionCountry[]): IProductionCountry[] {
    return countries.map((country: IRoProductionCountry) => {
      return {
        short: country.iso_3166_1,
        name: country.name
      }
    })
  }
}
