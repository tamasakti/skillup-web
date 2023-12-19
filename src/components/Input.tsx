import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string,
    placeholder?: string,
    label: string,
    htmlFor: string,
    ariaLabel : string,
    name : string,
    type: string,
}


const Input = ({id, placeholder, label, htmlFor,ariaLabel, name, type, ...props} : InputProps) => {
  return (
    <div className='flex flex-col gap-2'>
        <label htmlFor={htmlFor} aria-aria-label={ariaLabel} className='font-semibold'>{label}</label>
        <input 
        id={id}
        placeholder={placeholder}
        name={name}
        type={type}
        {...props}
        />
    </div>
  )
}

export default Input

interface InputCostum extends InputHTMLAttributes<HTMLInputElement> {
  id: string,
  placeholder: string,
  name: string,
  type: string,
}


export const InputCustom = ({id, placeholder, name, type, ...props}: InputCostum) => {
  return (
    <input 
    id={id}
    placeholder={placeholder}
    name={name}
    type={type}
    {...props}
    />
  )
}