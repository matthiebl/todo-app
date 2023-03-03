import React from 'react'

interface ButtonProps {
    children?: React.ReactNode
    onClick?: React.MouseEventHandler<HTMLButtonElement>

    styles?: string
}

const Button: React.FC<ButtonProps> = ({ children, onClick, styles = '' }) => {
    return (
        <button
            className={'rounded-lg bg-indigo-600 py-1.5 px-3 text-sm text-white hover:bg-indigo-700' + styles}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

interface PrimaryButtonProps {
    children?: React.ReactNode
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, onClick }) => {
    return <Button onClick={onClick}>{children}</Button>
}
