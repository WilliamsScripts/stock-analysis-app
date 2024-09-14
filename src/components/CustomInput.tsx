import clsx from 'clsx'
import React, { forwardRef, InputHTMLAttributes } from 'react'

type CustomInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string 
  error?: string 
  wrapperClasses?: string
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(({ label, className, wrapperClasses, error, ...attributes }, ref) => {
  return (
    <div className={clsx(wrapperClasses)}>
      {label && <label className="block text-sm font-medium">{label}</label>}
      <input
        className={clsx("my-1 h-11 px-2.5 w-full border text-sm rounded-lg", className)}
        ref={ref}
        {...attributes}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
})

CustomInput.displayName = 'CustomInput'

export default CustomInput