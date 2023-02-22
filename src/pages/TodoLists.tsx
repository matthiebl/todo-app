import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../api/firebase'
import { PageWrapper } from '../components'

interface TodoListsPageProps {}

export const TodoListsPage: React.FC<TodoListsPageProps> = ({}) => {
    const navigate = useNavigate()

    React.useEffect(() => {
        if (!auth.currentUser) {
            navigate('/login')
        }
    }, [])

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
                <TodoListItem
                    id='todo'
                    color='bg-indigo-600'
                    title='This is a list title'
                    lastEdit='February 22, 2023'
                />
                <TodoListItem
                    id='todo'
                    color='bg-indigo-600'
                    title='This is a list title'
                    lastEdit='February 22, 2023'
                />
                <TodoListItem
                    id='todo'
                    color='bg-indigo-600'
                    title='This is a list title'
                    lastEdit='February 22, 2023'
                />
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

interface TodoListItemProps {
    id: string
    color: string
    title: string
    lastEdit: string
}

const TodoListItem: React.FC<TodoListItemProps> = ({ id, color, title, lastEdit }) => {
    return (
        <a href={'#/' + id} className='flex h-10 items-center border-b border-gray-100 px-8 text-sm'>
            <div className='flex w-full items-center gap-3 truncate pr-4 sm:w-8/12'>
                <div className={'h-2.5 w-2.5 rounded-full ' + color} />
                {title}
            </div>
            <div className='hidden w-3/12 truncate text-right text-gray-400 sm:block'>{lastEdit}</div>
            <div className='hidden w-1/12 truncate text-right text-indigo-600 sm:block'>Edit</div>
        </a>
    )
}
