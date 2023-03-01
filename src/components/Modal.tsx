import React from 'react'

interface ModalProps {
    open: boolean
    controller: (open: boolean) => void
    children?: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ open, controller, children }) => {
    return (
        <div
            aria-hidden={!open}
            className='absolute top-0 left-0 z-40 flex h-screen w-screen items-center justify-center backdrop-blur-[2px] aria-hidden:hidden'
            onClick={event => {
                event.preventDefault()
                event.stopPropagation()
                controller(false)
            }}
        >
            <div
                className='z-50 h-full w-full bg-white px-8 py-6 sm:h-fit sm:max-w-xl sm:rounded-lg sm:border sm:border-gray-200 sm:shadow-lg'
                onClick={event => event.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}
