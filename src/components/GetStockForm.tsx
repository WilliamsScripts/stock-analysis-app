import React from 'react'
import CustomInput from './CustomInput'
import { STOCK_OPTIONS } from '@/data/constants'
import CustomReactSelect from './CustomReactSelect'
import { ValidationErrorType } from '@/data/types'

type GetStockFormProps = {
  fetchDataAction: (formData: FormData) => void
  errors: ValidationErrorType
}

const GetStockForm: React.FC<GetStockFormProps> = ({ fetchDataAction, errors }) => {
  return (
    <form action={fetchDataAction}>
      <div className='grid grid-cols-12 gap-3'>
        <CustomReactSelect
          label='Select Stock'
          options={STOCK_OPTIONS}
          name='stock'
          isMulti={true}
          defaultValue={{ label: 'Apple', value: 'AAPL' }}
          error={errors?.tickers?.join(', ')}
          wrapperClasses='col-span-6'
        />

        <div className='col-span-6 grid grid-cols-2 items-center gap-3'>
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
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
        Generate Data
      </button>
    </form>
  )
}

export default GetStockForm