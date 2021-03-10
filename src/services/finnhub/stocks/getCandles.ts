import moment from 'moment';
import api, {handleError} from '../index';
import {CleanCandleData} from '../../../interfaces/finnhub.interface';
import {normaliseCandleData} from '../../../utils/finnhub.utils';

export default async (stockSymbol: string): Promise<CleanCandleData> => {
  if (!stockSymbol) {
    return handleError({message: 'Symbol is required'});
  }
  try {
    const resolution = 'D';
    const from = moment().subtract(1, 'week').unix();
    const to = moment().unix();
    const {data} = await api.get(
      `stock/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}&to=${to}`
    );
    const normalisedData = normaliseCandleData(data);
    return normalisedData;
  } catch (error) {
    return handleError({message: 'getQuote error', response: error});
  }
};
