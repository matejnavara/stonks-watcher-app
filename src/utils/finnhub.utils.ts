import moment from 'moment';
import {RawCandleData, CleanCandleData} from '../interfaces/finnhub.interface';

export const normaliseCandleData = (data: RawCandleData): CleanCandleData[] =>
  data.t.map((timestamp: number, index: number) => ({
    values: {
      shadowH: data.h[index],
      shadowL: data.l[index],
      open: data.o[index],
      close: data.c[index],
    },
    label: moment.unix(timestamp).format('DD/MM/YYYY'),
  }));

export const percentageChange = (
  currentPrice: number,
  pastPrice: number,
  decimals: number = 2
): number => Number(((1 - pastPrice / currentPrice) * 100).toFixed(decimals));
