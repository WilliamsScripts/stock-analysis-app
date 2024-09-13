'use client'
import { useState } from 'react';
import { calculateReturns, compareStock, getStockData } from '@/actions/stock-action';
import { CompareStockType, OptionProps, SelectedTickersType, StockData, ValidationErrorType } from '@/data/types';

const useStockHook = () => {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [returnsData, setReturnsData] = useState<( StockData & { return: number | null } )[]>([]);
  const [ticker, setTicker] = useState<OptionProps[]>([{ label: 'Apple', value: 'AAPL' }]);
  const [errors, setErrors] = useState<ValidationErrorType | undefined>(undefined);
  const [comparedData, setComparedData] = useState<CompareStockType[]>([]);
  const [selectedTickers, setSelectedTickers] = useState<SelectedTickersType>({
    tickerA: '',
    tickerB: ''
  });

  const fetchDataAction = async (formData: FormData) => {
    const __tickers = ticker.map(company => company.value);
    const startDate = formData.get('startDate') as string, 
      endDate = formData.get('endDate') as string;

    const data = await getStockData(__tickers, startDate, endDate);
    if (Array.isArray(data))  {
      const returns = await calculateReturns(data);
      setReturnsData(returns);
      setStockData(data);
    } else {
      setErrors(data)
    }

  }

  const handleTickerSelect = (newValue: unknown) => {
    const value = newValue as OptionProps[]
    setTicker((prev: OptionProps[]) => {
      const selectedValues = value.map(option => option.value);
      const filteredPrev = prev.filter(item => selectedValues.includes(item.value));
      const newSelections = value.filter(option => !prev.some(item => item.value === option.value));
      return [...filteredPrev, ...newSelections];
    });
  };

  const compareStockAction = async (formData: FormData) => {
    setErrors(undefined)
    setComparedData([])
    const result = await compareStock(formData)
    if (Array.isArray(result)) {
      setComparedData(result); 
    } else {
      setErrors(result); 
    }
    setSelectedTickers({
      tickerA: formData.get('tickerA') as string,
      tickerB: formData.get('tickerB') as string,
    });
  }
  
  return {
    stockData,
    returnsData,
    ticker,
    errors,
    comparedData,
    selectedTickers,
    fetchDataAction,
    handleTickerSelect,
    compareStockAction
  }
}

export default useStockHook