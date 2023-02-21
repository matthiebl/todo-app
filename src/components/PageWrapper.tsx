import React from 'react'

interface PageWrapperProps {
    children: React.ReactNode
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
    return (
        <div className='h-screen w-screen'>
            <Navbar />
            <div className='flex h-full w-full justify-center pb-20 sm:pb-0 sm:pl-24'>{children}</div>
        </div>
    )
}

const Navbar = () => {
    return (
        <nav className='fixed bottom-0 left-0 h-16 w-full overflow-y-auto bg-indigo-600 sm:h-full sm:w-24'>
            <div className='flex h-full w-full items-center justify-evenly sm:hidden'>
                <button className='rounded-full bg-indigo-700 p-2.5 shadow hover:bg-indigo-800'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='h-7 w-7 stroke-white'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z'
                        />
                        <path strokeLinecap='round' strokeLinejoin='round' d='M6 6h.008v.008H6V6z' />
                    </svg>
                </button>
                <button className='rounded-full bg-indigo-700 p-2.5 shadow hover:bg-indigo-800'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='h-7 w-7 stroke-white'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776'
                        />
                    </svg>
                </button>
                <button className='rounded-full bg-indigo-700 p-2.5 shadow hover:bg-indigo-800'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='h-7 w-7 stroke-white'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
                        />
                    </svg>
                </button>
            </div>

            <div className='hidden flex-col items-center gap-3 p-3 sm:flex'>
                <button className='flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-indigo-700 text-white hover:bg-indigo-800'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='h-7 w-7 stroke-white'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776'
                        />
                    </svg>
                    <div className='translate-y-1 text-xs'>Lists</div>
                </button>
                <button className='flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-indigo-700 text-white hover:bg-indigo-800'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='h-7 w-7 stroke-white'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
                        />
                    </svg>
                    <div className='translate-y-1 text-xs'>New</div>
                </button>
                <button className='flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-indigo-700 text-white hover:bg-indigo-800'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='h-7 w-7 stroke-white'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z'
                        />
                        <path strokeLinecap='round' strokeLinejoin='round' d='M6 6h.008v.008H6V6z' />
                    </svg>
                    <div className='translate-y-1 text-xs'>Tags</div>
                </button>
            </div>
        </nav>
    )
}
