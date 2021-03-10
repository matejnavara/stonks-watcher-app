import moment from 'moment';
import {
  RawCandleData,
  CleanCandleData,
  SingleCandleData,
} from '../interfaces/finnhub.interface';

/**
 * Take raw Finnhub candle data and outputs format for charts.
 * from: { c: [13, 14, ...], h: [...], l: [...], ... }
 * to: { data: [{ high: 13, low: 7, open: 9 ....}...], highest: 21, lowest: 3 }
 *
 * @param {RawCandleData} rawData as provided by https://finnhub.io/docs/api/stock-candles.
 * @return {CleanCandleData} Returns cleaned data for victory candlestick charts https://formidable.com/open-source/victory/docs/victory-candlestick/#data.
 */
export const normaliseCandleData = (
  rawData: RawCandleData
): CleanCandleData => {
  let highest = rawData.h[0];
  let lowest = rawData.l[0];
  const data: SingleCandleData[] = rawData.t.map(
    (timestamp: number, index: number) => {
      if (rawData.h[index] > highest) highest = rawData.h[index];
      if (rawData.l[index] < lowest) lowest = rawData.l[index];
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

/**
 * The percentage change between 2 values
 *
 * @param {number} currentPrice comparison price
 * @param {number} pastPrice base price
 * @param {number} decimals optional, trim return to X decimal places. Defaults to 2.
 * @return {number} Returns positive or negative number value
 */
export const percentageChange = (
  currentPrice: number,
  pastPrice: number,
  decimals: number = 2
): number =>
  Number((((currentPrice - pastPrice) / pastPrice) * 100).toFixed(decimals));
