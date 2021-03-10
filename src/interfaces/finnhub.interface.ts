export interface RawCandleData {
  c: Array<number>;
  h: Array<number>;
  l: Array<number>;
  o: Array<number>;
  s: string;
  t: Array<number>;
  v: Array<number>;
}

export interface CleanCandleData {
  high: number;
  low: number;
  open: number;
  close: number;
  x: string;
}

export interface RawQuoteData {
  c: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
}

export interface CleanQuoteData {
  current: number;
  previous: number;
  timestamp: number;
}
