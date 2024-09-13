import { STOCK_OPTIONS } from '@/data/constants'
import React from 'react'
import CustomSelect from './CustomSelect'
import CustomInput from './CustomInput'
import { ValidationErrorType } from '@/data/types'

type CompareStockFormProps = {
  compareStockAction: (formData: FormData) => void
  errors: ValidationErrorType
}

const CompareStockForm: React.FC<CompareStockFormProps> = ({ compareStockAction, errors }) => {
  return (
    <form action={compareStockAction} className='grid grid-cols-4 max-sm:grid-cols-1 items-start gap-5'>
      <CustomSelect
        label="Stock A"
        name="tickerA"
        defaultValue='AAL'
        options={STOCK_OPTIONS}
        error={errors?.tickerA?.join(', ')}
        required={false}
      />

      <CustomSelect 
        label="Stock B"
        name="tickerB"
        defaultValue='AAPL'
        options={STOCK_OPTIONS}
        error={errors?.tickerB?.join(', ')}
        required={false}
      />

      <CustomInput
        label="Start Date"
        name="startDate"
        type="date"
        defaultValue='2023-01-01'
        error={errors?.startDate?.join(', ')}
        required
      />

      <CustomInput 
        label="End Date"
        name="endDate"
        type="date"
        defaultValue='2023-04-06'
        error={errors?.endDate?.join(', ')}
        required
      />

      <button type="submit" className="bg-green-500 text-white py-2 h-11 px-4 rounded-md">
        Compare
      </button>
    </form>
  )
}

export default CompareStockForm