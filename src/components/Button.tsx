import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    id: string,
    label : string,
    icon? : JSX.Element,
    loading? : boolean,
    onClick? : () => void
}

const Button = ({id, label, icon, loading, onClick, ...props}: ButtonProps) => {
  return (
    <button
    id={id}
    className={`${
      loading &&
      "btn w-full mt-4 bg-customcyan text-white disabled:bg-gray-300 disabled:text-gray-500 border-0"
    }`}
    onClick={onClick}
    {...props}
    >
        {icon}{label}
    </button>
  )
}

export default Button