import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnitsResponse } from '../types/units-response.interface';
import { Location } from '../types/location.interface';

/**
 * Service responsible for retrieving and managing location data.
 */
@Injectable({
  providedIn: 'root',
})
export class GetUnitsService {
  readonly API_URL = 'https://test-frontend-developer.s3.amazonaws.com/data/locations.json';

  private allUnitsSubject: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([]);
  private allUnits$: Observable<Location[]> =this.allUnitsSubject.asObservable();
  private filteredUnits: Location[] = [];

  /**
   * Constructor that initializes the service and retrieves location data from the API.
   * @param httpClient The HttpClient used to make API requests.
   */
  constructor(private httpClient: HttpClient) {
    this.httpClient.get<UnitsResponse>(this.API_URL).subscribe((data) => {
      this.allUnitsSubject.next(data.locations);
      this.filteredUnits = data.locations;
    });
  }

  /**
   * Returns an Observable that emits an array of all locations.
   * @returns An Observable that emits an array of all locations.
   */
  getAllUnits(): Observable<Location[]> {
    return this.allUnits$;
  }

  /**
   * Returns an array of filtered locations.
   * @returns An array of filtered locations.
   */
  getFilteredUnits(): Location[] {
    return this.filteredUnits;
  }

  /**
   * Sets the array of filtered locations.
   * @param units The new array of filtered locations.
   */
  setFilteredUnits(units: Location[]): void {
    this.filteredUnits = units;
  }
}
