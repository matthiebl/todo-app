import React from 'react'

interface CloseButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
    return (
        <button className='rounded-full p-0.5 text-gray-600 hover:text-gray-800' onClick={onClick}>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-6 w-6'
            >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
        </button>
    )
}
