import React from 'react'
import { PageWrapper } from '../components'

interface TodoListsPageProps {}

export const TodoListsPage: React.FC<TodoListsPageProps> = ({}) => {
    return (
        <PageWrapper>
            <main className='h-full w-full max-w-5xl overflow-y-auto'>
                <div className='flex items-center justify-between py-4 px-8'>
                    <h2 className='text-2xl'>Todo Lists</h2>
                    <div className='flex gap-2'>
                        <button className='rounded-lg bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-700'>
                            Create
                        </button>
                    </div>
                </div>

                <div className='border-t border-gray-200' />

                <div className='py-4 px-8 pb-3'>
                    <h4 className='mb-2'>Recent Lists</h4>

                    <div className='flex w-full items-center gap-6 overflow-y-auto pb-3'>
                        <RecentList color='bg-indigo-600' title='Shopping List' />
                    </div>
                </div>

                <div className='flex h-10 items-center border-y border-gray-200 bg-gray-100 px-8 text-sm font-bold'>
                    <div className='w-full truncate pr-4 sm:w-8/12'>Lists</div>
                    <div className='hidden w-3/12 truncate text-right sm:block'>Last Updated</div>
                </div>
                <a href='#/todo' className='flex h-10 items-center border-b border-gray-100 px-8 text-sm'>
                    <div className='w-full truncate pr-4 sm:w-8/12'>List title</div>
                    <div className='hidden w-3/12 truncate text-right text-gray-400 sm:block'>February 22, 2023</div>
                    <div className='hidden w-1/12 truncate text-right text-indigo-600 sm:block'>Edit</div>
                </a>
            </main>
        </PageWrapper>
    )
}

interface RecentListProps {
    color: string
    title: string
}

const RecentList: React.FC<RecentListProps> = ({ color, title }) => {
    return (
        <a className='flex w-48 rounded-lg border border-gray-200' href='#'>
            <div className={'w-4 rounded-l-lg ' + color} />
            <div className='w-full overflow-hidden py-2 px-4'>
                <p className='truncate'>{title}</p>
            </div>
        </a>
    )
}
