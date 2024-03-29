import React from 'react'
import { useNavigate } from 'react-router-dom'

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
    const navigate = useNavigate()

    return (
        <nav className='z-40 fixed bottom-0 left-0 h-20 w-full overflow-y-auto sm:h-full sm:w-24'>
            <div className='flex h-full w-full items-center justify-center sm:flex-col sm:justify-start sm:gap-3 sm:p-3'>
                {/* <button className='hidden items-center justify-center rounded-full bg-indigo-700 p-2.5 text-white shadow hover:bg-indigo-800 sm:order-3 sm:h-16 sm:w-16 sm:flex-col sm:rounded-lg'>
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
                    <div className='hidden translate-y-1 text-xs sm:block'>Tags</div>
                </button> */}
                <button
                    onClick={() => navigate('/')}
                    className='rounded-full bg-indigo-700 p-3 text-white shadow hover:bg-indigo-800 sm:p-4'
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='h-7 w-7 stroke-white'
                    >
                        {window.location.pathname === '/' ? (
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776'
                            />
                        ) : (
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z'
                            />
                        )}
                    </svg>
                </button>
                {/* <button className='hidden rounded-full bg-indigo-700 p-2.5 text-white shadow hover:bg-indigo-800 sm:order-2 sm:h-16 sm:w-16 sm:flex-col sm:items-center sm:justify-center sm:rounded-lg'>
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
                    <div className='hidden translate-y-1 text-xs sm:block'>New</div>
                </button> */}
            </div>
        </nav>
    )
}
