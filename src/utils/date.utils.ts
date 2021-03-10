import moment, {Moment} from 'moment';

/**
 * Date for X weekdays ago.
 *
 * @param {number} days Number of weekdays ago.
 * @param {Moment} refDate The date from which to go back, defaults to today.
 * @return {Moment} Returns Moment object for the date last X weekdays from refDate.
 */
export const lastWeekdays = (
  days: number,
  refDate: Moment = moment()
): Moment => {
  let date = moment(refDate); // use a clone
  while (days > 0) {
    date = date.subtract(1, 'days');
    // decrease "days" only if it's a weekday.
    if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
      days -= 1;
    }
  }
  return date;
};
