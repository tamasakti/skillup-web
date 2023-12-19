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
    className={`${loading && "bg-gray-700 cursor-not-allowed"}`}
    disabled={loading}
    onClick={onClick}
    {...props}
    >
        {icon}{label}
    </button>
  )
}

export default Button