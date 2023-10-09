import { Location } from "./location.interface";

/**
 * Interface for the response object returned by the API when requesting a list of units.
 */
export interface UnitsResponse {
  /**
   * The ID of the country where the units are located.
   */
  current_country_id: number;
  /**
   * An array of Location objects representing the units.
   */
  locations: Location[];
}
