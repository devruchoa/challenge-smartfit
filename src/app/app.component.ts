import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GetUnitsService } from './services/get-units.service';
import { Location } from './types/location.interface';


/**
 * The root component of the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * A BehaviorSubject that determines whether to show the list of units or not.
   */
  showList = new BehaviorSubject<boolean>(false);

  /**
   * An array of Location objects representing the list of units.
   */
  unitsList: Location[] = [];

  /**
   * Creates an instance of AppComponent.
   * @param unitsService The service used to retrieve the list of units.
   */
  constructor(private unitsService: GetUnitsService) { }

  /**
   * Called when the form is submitted.
   * Sets the showList BehaviorSubject to true and retrieves the filtered list of units.
   */
  onSubmit() {
    this.showList.next(true);
    this.unitsList = this.unitsService.getFilteredUnits();
  }
}
