import moment from 'moment';
import {RawCandleData, CleanCandleData} from '../interfaces/finnhub.interface';

export const normaliseCandleData = (data: RawCandleData): CleanCandleData[] =>
  data.t.map((timestamp: number, index: number) => ({
    high: data.h[index],
    low: data.l[index],
    open: data.o[index],
    close: data.c[index],
    x: moment.unix(timestamp).format('DD/MM/YYYY'),
  }));

export const percentageChange = (
  currentPrice: number,
  pastPrice: number,
  decimals: number = 2
): number => Number(((1 - pastPrice / currentPrice) * 100).toFixed(decimals));
