import moment from 'moment';
import {
  RawCandleData,
  CleanCandleData,
  SingleCandleData,
} from '../interfaces/finnhub.interface';

export const normaliseCandleData = (
  rawData: RawCandleData
): CleanCandleData => {
  let highest = rawData.h[0];
  let lowest = rawData.l[0];
  const data: SingleCandleData[] = rawData.t.map(
    (timestamp: number, index: number) => {
      if (rawData.l[index] < lowest) lowest = rawData.l[index];
      if (rawData.h[index] > highest) highest = rawData.l[index];
      return {
        high: rawData.h[index],
        low: rawData.l[index],
        open: rawData.o[index],
        close: rawData.c[index],
        x: moment.unix(timestamp).format('DD/MM'),
      };
    }
  );
  return {
    data,
    highest,
    lowest,
  };
};

export const percentageChange = (
  currentPrice: number,
  pastPrice: number,
  decimals: number = 2
): number => Number(((1 - pastPrice / currentPrice) * 100).toFixed(decimals));
