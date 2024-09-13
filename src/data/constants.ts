import { OptionProps } from "./types"

export const SERVER_URL: string | undefined = process.env.NEXT_PUBLIC_SERVER_URL

export const STOCK_OPTIONS: OptionProps[] = [
  { label: 'American Airlines (AAL)', value: 'AAL' },
  { label: 'Apple (AAPL)', value: 'AAPL' },
  { label: 'Microsoft (MSFT)', value: 'MSFT' },
  { label: 'Amazon (AMZN)', value: 'AMZN' },
  { label: 'Google (GOOGL)', value: 'GOOGL' }
]