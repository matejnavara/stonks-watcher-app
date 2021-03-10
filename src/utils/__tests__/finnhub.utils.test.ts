import {normaliseCandleData, percentageChange} from '../finnhub.utils';

import {
  mockRawCandleData,
  mockEmptyRawCandleData,
  mockCleanCandleData,
} from '../../__mocks__/finnhub.mock';

describe('normaliseCandleData', () => {
  test('correct output expected', () => {
    const cleanData = normaliseCandleData(mockRawCandleData);
    expect(cleanData).toEqual(mockCleanCandleData);
  });

  test('empty input returns empty output', () => {
    const emptyData = normaliseCandleData(mockEmptyRawCandleData);
    expect(emptyData).toEqual({
      data: [],
      highest: undefined,
      lowest: undefined,
    });
  });
});

describe('percentageChange', () => {
  test('correct increase calculation', () => {
    const increase = percentageChange(185, 150, 0);
    expect(increase).toBe(23);
  });

  test('correct decrease calculation', () => {
    const increase = percentageChange(83, 150, 0);
    expect(increase).toBe(-45);
  });

  test('correct no change calculation', () => {
    const increase = percentageChange(150, 150, 0);
    expect(increase).toBe(0);
  });
});
