export type StockData = {
  Date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ticker: string;
};

export type ValidationErrorType = { [x: string]: string[] | undefined;[x: number]: string[] | undefined;[x: symbol]: string[] | undefined; } | undefined

export type OptionProps = { value: string, label: string }

export type SelectedTickersType = { tickerA: string, tickerB: string }

export interface CompareStockType { date: string; stockA: number; stockB: number; }[]