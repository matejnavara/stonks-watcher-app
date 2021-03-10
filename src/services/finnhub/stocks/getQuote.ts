import api, {handleError} from '../index';
import {CleanQuoteData} from '../../../interfaces/finnhub.interface';

export default async (stockSymbol: string): Promise<CleanQuoteData> => {
  if (!stockSymbol) {
    return handleError({message: 'Symbol is required'});
  }
  try {
    const {data} = await api.get(`quote?symbol=${stockSymbol}`);
    console.log('🚀 ~ file: getQuote.ts ~ line 10 ~ data', data);
    return {
      current: data.c,
      previous: data.pc,
      timestamp: data.t,
    };
  } catch (error) {
    return handleError({message: 'getQuote error', response: error});
  }
};
