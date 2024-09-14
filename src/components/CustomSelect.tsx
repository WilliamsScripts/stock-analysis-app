import clsx from 'clsx'
import { OptionProps } from '@/data/types'
import React, { forwardRef, SelectHTMLAttributes } from 'react'

type CustomSelectProps = SelectHTMLAttributes<HTMLSelectElement> &  {
  label: string
  options?: OptionProps[]
  error?: string 
  wrapperClasses?: string
}

const CustomSelect = forwardRef<HTMLSelectElement, CustomSelectProps>(({ label, wrapperClasses, className, error, options, ...attributes }, ref) => {
  return (
    <div className={clsx(wrapperClasses)}>
      {label && <label className="block text-sm font-medium">{label}</label>}
      <select
        className={clsx("my-1 h-11 px-2.5 w-full border text-sm rounded-lg", className)} 
        ref={ref}
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