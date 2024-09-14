import React from 'react'
import CustomInput from './CustomInput'
import { STOCK_OPTIONS } from '@/data/constants'
import CustomReactSelect from './CustomReactSelect'
import { OptionProps, ValidationErrorType } from '@/data/types'


type GetStockFormProps = {
  fetchDataAction: (formData: FormData) => void
  errors: ValidationErrorType
  ticker: OptionProps[]
  handleTickerSelect: (newValue: unknown) => void
}

const GetStockForm: React.FC<GetStockFormProps> = ({ fetchDataAction, errors, ticker, handleTickerSelect }) => {
  return (
    <form action={fetchDataAction}>
      <div className='grid grid-cols-12 gap-3 mb-4'>
        <CustomReactSelect
          label='Select Stock'
          options={STOCK_OPTIONS}
          name='stock'
          isMulti={true}
          defaultValue={ticker}
          onChange={handleTickerSelect}
          error={errors?.tickers?.join(', ')}
          wrapperClasses='col-span-6 max-md:col-span-12'
        />

        <div className='col-span-6 max-md:col-span-12 grid grid-cols-2 max-sm:grid-cols-1 items-center gap-3'>
          <CustomInput 
            type='date'
            label='Start Date'
            name="startDate"
            defaultValue='2023-01-01'
            error={errors?.startDate?.join(', ')}
          />

          <CustomInput 
            type='date'
            label='End Date'
            name="endDate"
            defaultValue='2023-04-06'
            error={errors?.endDate?.join(', ')}
          />
        </div>
      </div>
      <button type="submit" className="bg-green-500 text-white py-2 px-4 max-md:w-full rounded-md">
        Generate Data
      </button>
    </form>
  )
}

export default GetStockForm