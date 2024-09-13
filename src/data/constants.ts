import { OptionProps } from "./types"

export const SERVER_URL: string | undefined = process.env.NEXT_PUBLIC_SERVER_URL

export const STOCK_OPTIONS: OptionProps[] = [
  { label: 'American Airlines', value: 'AAL' },
  { label: 'Apple', value: 'AAPL' },
  { label: 'Microsoft', value: 'MSFT' },
  { label: 'Amazon', value: 'AMZN' },
  { label: 'Google', value: 'GOOGL' }
]