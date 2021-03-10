import moment from 'moment';
import api, {handleError} from '../index';
import {CleanCandleData} from '../../../interfaces/finnhub.interface';
import {normaliseCandleData} from '../../../utils/finnhub.utils';
import {lastWeekdays} from '../../../utils/date.utils';

export default async (stockSymbol: string): Promise<CleanCandleData> => {
  if (!stockSymbol) {
    return handleError({message: 'Symbol is required'});
  }
  try {
    // TODO: extend endpoint to call different resolutions and timeframes
    const resolution = 'D'; // Display Day resolution
    const from = lastWeekdays(7).unix(); // Last 7 open market days
    const to = moment().unix(); // Until present
    const {data} = await api.get(
      `stock/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}&to=${to}`
    );
    const normalisedData = normaliseCandleData(data);
    return normalisedData;
  } catch (error) {
    return handleError({message: 'getQuote error', response: error});
  }
};
