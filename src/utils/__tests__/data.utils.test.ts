import moment from 'moment';
import {lastWeekdays} from '../date.utils';

describe('lastWeekDays', () => {
  test('skips the weekend', () => {
    const MondayDate = moment('08/03/21', 'DD/MM/YY');
    const testDate = lastWeekdays(3, MondayDate).format('DD/MM/YY');
    expect(testDate).toBe('03/03/21'); // The Wednesday before.
  });

  test('same result starting on the weekend', () => {
    const SundayDate = moment('07/03/21', 'DD/MM/YY');
    const testDate = lastWeekdays(3, SundayDate).format('DD/MM/YY');
    expect(testDate).toBe('03/03/21'); // Still the Wednesday before.
  });
});
