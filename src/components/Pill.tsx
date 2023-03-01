import React from 'react'

interface PillProps {
    text?: string
    colour?: PillColour
    selected?: boolean
    disabled?: boolean
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const Pill: React.FC<PillProps> = ({ text, colour = 'red', selected = false, disabled = false, onClick }) => {
    return (
        <button
            aria-selected={selected}
            disabled={disabled}
            onClick={onClick}
            className={
                'h-5 rounded-full py-0.5 px-2 text-xs text-white outline-offset-2 aria-selected:outline aria-selected:outline-1 ' +
                colourMap[colour]
            }
        >
            {text && text}
        </button>
    )
}

type PillColour = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink'

const colourMap: Record<PillColour, string> = {
    red: 'bg-red-600 outline-red-600',
    orange: 'bg-orange-500 outline-orange-500',
    yellow: 'bg-yellow-500 outline-yellow-500',
    green: 'bg-lime-500 outline-lime-500',
    blue: 'bg-sky-500 outline-sky-500',
    purple: 'bg-purple-500 outline-purple-500',
    pink: 'bg-pink-500 outline-pink-500',
}
