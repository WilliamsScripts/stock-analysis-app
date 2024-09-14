'use client'
import clsx from 'clsx';
import { OptionProps } from '@/data/types';
import ReactSelect, { SelectInstance } from 'react-select';
import React, { forwardRef, useEffect, useState } from 'react'

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

CustomReactSelect.displayName = 'CustomReactSelect'

export default CustomReactSelect