import { Component, Input } from '@angular/core';
import { Location } from 'src/app/types/location.interface';

/**
 * Component that represents a card with location information.
 */
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  /**
   * The location object to be displayed in the card.
   */
  @Input() card!: Location;
}
