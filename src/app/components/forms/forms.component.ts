import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterUnitsService } from 'src/app/services/filter-units.service';
import { GetUnitsService } from 'src/app/services/get-units.service';
import { Location } from 'src/app/types/location.interface';

/**
 * Component responsible for displaying a form to filter locations.
 */
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  /**
   * Event emitter that emits when the form is submitted.
   */
  @Output() submitEvent = new EventEmitter();

  /**
   * Array of all locations.
   */
  results: Location[] = [];

  /**
   * Array of filtered locations.
   */
  filteredResults: Location[] = [];

  /**
   * FormGroup instance that holds the form controls.
   */
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private unitService: GetUnitsService,
    private filterUnitsService: FilterUnitsService
  ) {}

  ngOnInit() {
    /**
     * Initializes the formGroup with default values and subscribes to the getAllUnits method to get all locations.
     */
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true,
    });
    this.unitService.getAllUnits().subscribe((data) => {
      this.results = data;
      this.filteredResults = data;
    });
  }

  /**
   * Filters the locations based on the form values and emits the submitEvent.
   */
  onSubmit(): void {
    let { showClosed, hour } = this.formGroup.value;
    this.filteredResults = this.filterUnitsService.filter(
      this.results,
      showClosed,
      hour
    );
    this.unitService.setFilteredUnits(this.filteredResults);
    this.submitEvent.emit();
  }

  /**
   * Resets the formGroup to its default values.
   */
  onClean(): void {
    this.formGroup.reset();
  }
}
