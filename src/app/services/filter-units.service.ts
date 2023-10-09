import { Injectable } from '@angular/core';
import { Location } from '../types/location.interface';

/**
 * Object containing the opening hours for different periods of the day.
 * @typedef {Object} OpeningHours
 * @property {Object} morning - Object containing the opening and closing hours for the morning period.
 * @property {string} morning.first - The opening hour for the morning period.
 * @property {string} morning.last - The closing hour for the morning period.
 * @property {Object} afternoon - Object containing the opening and closing hours for the afternoon period.
 * @property {string} afternoon.first - The opening hour for the afternoon period.
 * @property {string} afternoon.last - The closing hour for the afternoon period.
 * @property {Object} night - Object containing the opening and closing hours for the night period.
 * @property {string} night.first - The opening hour for the night period.
 * @property {string} night.last - The closing hour for the night period.
 */
const OPENING_HOURS = {
  morning: {
    first: '06',
    last: '12'
  },
  afternoon: {
    first: '12',
    last: '18'
  },
  night: {
    first: '18',
    last: '23'
  }
}

/**
 * Defines the possible hour indexes for filtering units.
 */
type HOUR_INDEXES = 'morning' | 'afternoon' | 'night'

/**
 * Service responsible for filtering units based on opening hours and weekdays.
 */
@Injectable({
  providedIn: 'root'
})
export class FilterUnitsService {

  constructor() { }

  /**
   * Transforms a weekday number into a string representation.
   * @param weekday The weekday number to be transformed.
   * @returns A string representation of the weekday.
   */
  transformWeekday(weekday: number){
    switch (weekday) {
      case 0:
        return 'Dom.'
      case 6:
        return 'Sáb.'
      default:
        return 'Seg. à Sex.'
    }
  }

  /**
   * Filters units based on their schedules and opening hours.
   * @param unit - The location unit to filter.
   * @param open_hour - The opening hour to filter.
   * @param close_hour - The closing hour to filter.
   * @returns A boolean indicating whether the unit should be filtered or not.
   */
  filterUnits(unit: Location, open_hour: string, close_hour: string) {
    if(!unit.schedules) return true;

    let open_hour_filter = parseInt(open_hour, 10)
    let close_hour_filter = parseInt(close_hour, 10)

    let todays_weekday = this.transformWeekday(new Date().getDay());

    for(let i = 0; i < unit.schedules.length; i++){
      let schedule_hour = unit.schedules[i].hour
      let schedule_weekday = unit.schedules[i].weekdays
      if(todays_weekday === schedule_weekday){
        if(schedule_hour !== 'Fechada'){
          let [unit_open_hour, unit_close_hour] = schedule_hour.split(' às ')
          let unit_open_hour_int = parseInt(unit_open_hour.replace('h', ''), 10)
          let unit_close_hour_int = parseInt(unit_close_hour.replace('h', ''), 10)

          if(unit_open_hour_int <= open_hour_filter && unit_close_hour_int >= close_hour_filter) return true
          else return false
        }
      }
    }

    return false;
  }

  /**
   * Filters a list of locations based on whether they are open at a given hour and whether to show closed locations.
   * @param results - The list of locations to filter.
   * @param showClosed - Whether to include closed locations in the results.
   * @param hour - The hour to check if locations are open. Should be in the format "HH:MM".
   * @returns The filtered list of locations.
   */
  filter(results: Location[], showClosed: boolean, hour: string){
    let intermediateResults = results;

    if(!showClosed) {
      intermediateResults = results.filter(location => location.opened === true);
    }

    if(hour){
      const OPEN_HOUR = OPENING_HOURS[hour as HOUR_INDEXES].first
      const CLOSE_HOUR = OPENING_HOURS[hour as HOUR_INDEXES].last
      return intermediateResults.filter(location => this.filterUnits(location, OPEN_HOUR, CLOSE_HOUR));
    } else {
      return intermediateResults;
    }
  }
}
