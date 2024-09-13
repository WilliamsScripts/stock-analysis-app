import { OptionProps } from '@/data/types';
import clsx from 'clsx';
import React, { forwardRef, useEffect, useState } from 'react'
import ReactSelect, { SelectInstance } from 'react-select';

export type CustomReactSelectProps = {
  label: string
  name: string
  defaultValue?: OptionProps | OptionProps[],
  onChange?: (newValue: unknown) => void,
  isMulti?: boolean
  error?: string
  wrapperClasses?: string
  className?: string
  options?: OptionProps[]
}

const CustomReactSelect = forwardRef<SelectInstance<unknown, boolean> | null, CustomReactSelectProps>(({ label, name, defaultValue, onChange, isMulti, error, wrapperClasses, className, options, ...attributes }, ref) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className={clsx(wrapperClasses)}>
      {label && <label className="block text-sm font-medium">{label}</label>}
      {isMounted && 
        <ReactSelect
          options={options}
          id={name}
          name={name}
          defaultValue={defaultValue}
          onChange={onChange}
          isMulti={isMulti}
          ref={ref}
          className={clsx(className)}
          {...attributes}
        />}
        {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
})

export default CustomReactSelect