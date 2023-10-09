import { Component, Input, OnInit } from '@angular/core';
import { GetUnitsService } from 'src/app/services/get-units.service';
import { Location } from 'src/app/types/location.interface';

/**
 * Component that displays a list of location cards.
 */
@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss'],
})
export class CardsListComponent implements OnInit {
  /**
   * The list of locations to display.
   */
  @Input() unitsList: Location[] = [];

  constructor(private unitService: GetUnitsService) {}

  ngOnInit(): void {}
}
