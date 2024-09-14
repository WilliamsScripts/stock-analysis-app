import clsx from 'clsx'
import React, { forwardRef } from 'react'

type CustomInputProps = {
  label: string 
  name: string 
  type: string
  defaultValue?: string
  required?: boolean
  error?: string 
  className?: string
  wrapperClasses?: string
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(({ label, name, type, defaultValue, className, wrapperClasses, required, error, ...attributes }, ref) => {
  return (
    <div className={clsx(wrapperClasses)}>
      {label && <label className="block text-sm font-medium">{label}</label>}
      <input
        type={type}
        name={name}
        className={clsx("my-1 h-11 px-2.5 w-full border text-sm rounded-lg", className)}
        defaultValue={defaultValue}
        required={required}
        ref={ref}
        {...attributes}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
})

CustomInput.displayName = 'CustomInput'

export default CustomInput