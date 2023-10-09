/**
 * Represents a location object.
 */
export interface Location {
  /** The ID of the location. */
  id: number;
  /** The title of the location. */
  title: string;
  /** The content of the location. */
  content: string;
  /** Whether the location is currently opened or not. */
  opened: boolean;
  /** The mask policy of the location. */
  mask: string;
  /** The towel policy of the location. */
  towel: string;
  /** The fountain policy of the location. */
  fountain: string;
  /** The locker room policy of the location. */
  locker_room: string;
  /** The schedules of the location. */
  schedules: Schedules[];
}

/**
 * Represents the schedules of a location.
 */
export interface Schedules {
  /**
   * The weekdays when the location is open.
   */
  weekdays: string;
  /**
   * The opening hour of the location.
   */
  hour: string;
}
