import clsx from 'clsx'
import React, { forwardRef } from 'react'
import { OptionProps } from '@/data/types'

type CustomSelectProps = {
  label: string
  name: string 
  defaultValue?: string
  required?: boolean
  className?: string
  options?: OptionProps[]
  error?: string 
  wrapperClasses?: string
}

const CustomSelect = forwardRef<HTMLSelectElement, CustomSelectProps>(({ label, name, wrapperClasses, className, defaultValue, required, error, options, ...attributes }, ref) => {
  return (
    <div className={clsx(wrapperClasses)}>
      {label && <label className="block text-sm font-medium">{label}</label>}
      <select 
        name={name} 
        defaultValue={defaultValue} 
        ref={ref} 
        required={required} 
        className={clsx("my-1 h-11 px-2.5 w-full border text-sm rounded-lg", className)} 
        {...attributes}
      >
        <option value="">Select Stock</option>
        {options?.map(item => <option value={item.value} key={item.value}>{item.label}</option>)}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
})

CustomSelect.displayName = 'CustomSelect'

export default CustomSelect