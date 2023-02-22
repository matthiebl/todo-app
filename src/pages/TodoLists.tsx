import React from 'react'
import { useNavigate } from 'react-router-dom'

import { auth } from '../api/firebase'
import { onAuthStateChanged } from 'firebase/auth'

import { PageWrapper } from '../components'
import { createList } from '../api'

interface TodoListsPageProps {}

export const TodoListsPage: React.FC<TodoListsPageProps> = ({}) => {
    const navigate = useNavigate()

    React.useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (!user) {
                navigate('/login')
            }
        })
    }, [])

    const [open, setOpen] = React.useState(false)

    return (
        <PageWrapper>
            <NewListModal open={open} setOpen={setOpen} />
            <main className='h-full w-full max-w-5xl overflow-y-auto'>
                <div className='flex items-center justify-between py-4 px-8'>
                    <h2 className='text-2xl'>Todo Lists</h2>
                    <div className='flex gap-2'>
                        <button
                            className='rounded-lg bg-indigo-600 py-1.5 px-4 text-white hover:bg-indigo-700'
                            onClick={() => setOpen(true)}
                        >
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

                <div className='flex h-10 items-center border-y border-gray-200 bg-gray-100 px-8 text-sm font-semibold'>
                    <div className='w-full truncate pr-4 sm:w-8/12'>Lists</div>
                    <div className='hidden w-3/12 truncate text-right sm:block'>Last Updated</div>
                </div>

                <div className='flex h-10 items-center justify-center gap-1 border-b border-gray-100 px-8 text-sm text-gray-400'>
                    You have no todo lists -{' '}
                    <button className='text-indigo-600 hover:underline' onClick={() => setOpen(true)}>
                        Create one
                    </button>
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

interface ModalProps {
    open: boolean
    setOpen: (b: boolean) => any
}

const NewListModal: React.FC<ModalProps> = ({ open, setOpen }) => {
    const navigate = useNavigate()

    const [creating, setCreating] = React.useState(false)
    const [title, setTitle] = React.useState('')
    const [tag, setTag] = React.useState('')
    const onChangeTag = (value: string) => setTag(value)

    return (
        <div
            aria-hidden={!open}
            className='absolute top-0 left-0 z-40 flex h-screen w-screen items-center justify-center backdrop-blur-[2px] aria-hidden:hidden'
            onClick={event => {
                event.preventDefault()
                event.stopPropagation()
                setOpen(false)
            }}
        >
            <div
                className='z-50 h-full w-full bg-white px-8 py-6 sm:h-fit sm:max-w-xl sm:rounded-lg sm:border sm:border-gray-200 sm:shadow-lg'
                onClick={event => event.stopPropagation()}
            >
                <div className='flex w-full justify-between'>
                    <h2 className='truncate text-xl font-semibold'>Create a new todo list</h2>
                    <button
                        className='rounded-full p-0.5 text-gray-600 hover:text-gray-800'
                        onClick={() => setOpen(false)}
                    >
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
                </div>

                <div className='mt-4'>
                    <label htmlFor='new-list-todo' className='text-sm font-semibold text-gray-800'>
                        Title
                    </label>
                    <input
                        id='new-list-todo'
                        name='title'
                        type='text'
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                        required
                        className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
                        placeholder={"Setup for Mark's Party"}
                    />
                </div>

                <div className='mt-4'>
                    <p className='mb-1 text-sm font-semibold text-gray-800'>Colour</p>
                    <div className='flex flex-wrap gap-2 text-xs text-white'>
                        <button
                            aria-selected={tag === 'bg-red-600'}
                            onClick={() => onChangeTag('bg-red-600')}
                            className='rounded-full bg-red-600 py-0.5 px-2 outline-offset-2 outline-red-600 aria-selected:outline aria-selected:outline-1'
                        >
                            Red
                        </button>
                        <button
                            aria-selected={tag === 'bg-orange-500'}
                            onClick={() => onChangeTag('bg-orange-500')}
                            className='rounded-full bg-orange-500 py-0.5 px-2 outline-offset-2 outline-orange-500 aria-selected:outline aria-selected:outline-1'
                        >
                            Orange
                        </button>
                        <button
                            aria-selected={tag === 'bg-yellow-500'}
                            onClick={() => onChangeTag('bg-yellow-500')}
                            className='rounded-full bg-yellow-500 py-0.5 px-2 outline-offset-2 outline-yellow-500 aria-selected:outline aria-selected:outline-1'
                        >
                            Yellow
                        </button>
                        <button
                            aria-selected={tag === 'bg-lime-500'}
                            onClick={() => onChangeTag('bg-lime-500')}
                            className='rounded-full bg-lime-500 py-0.5 px-2 outline-offset-2 outline-lime-500 aria-selected:outline aria-selected:outline-1'
                        >
                            Green
                        </button>
                        <button
                            aria-selected={tag === 'bg-sky-500'}
                            onClick={() => onChangeTag('bg-sky-500')}
                            className='rounded-full bg-sky-500 py-0.5 px-2 outline-offset-2 outline-sky-500 aria-selected:outline aria-selected:outline-1'
                        >
                            Blue
                        </button>
                        <button
                            aria-selected={tag === 'bg-purple-500'}
                            onClick={() => onChangeTag('bg-purple-500')}
                            className='rounded-full bg-purple-500 py-0.5 px-2 outline-offset-2 outline-purple-500 aria-selected:outline aria-selected:outline-1'
                        >
                            Purple
                        </button>
                        <button
                            aria-selected={tag === 'bg-pink-500'}
                            onClick={() => onChangeTag('bg-pink-500')}
                            className='rounded-full bg-pink-500 py-0.5 px-2 outline-offset-2 outline-pink-500 aria-selected:outline aria-selected:outline-1'
                        >
                            Pink
                        </button>
                    </div>
                </div>

                <div className='mt-6 flex flex-row-reverse gap-2'>
                    <button
                        disabled={title === '' || tag === '' || auth.currentUser === null || creating}
                        className='flex items-center justify-center rounded-lg bg-indigo-600 py-1.5 px-4 text-white hover:bg-indigo-700 disabled:bg-gray-400'
                        onClick={() => {
                            if (title === '' || tag === '' || auth.currentUser === null) return
                            setCreating(true)
                            createList(auth.currentUser.uid, title, tag, ref => {
                                setCreating(false)
                                navigate(`/todo/${ref.id}`)
                            })
                        }}
                    >
                        {creating && (
                            <svg
                                className='-ml-0.5 mr-2 h-5 w-5 animate-spin text-white'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                            >
                                <circle
                                    className='opacity-25'
                                    cx='12'
                                    cy='12'
                                    r='10'
                                    stroke='currentColor'
                                    strokeWidth='4'
                                ></circle>
                                <path
                                    className='opacity-75'
                                    fill='currentColor'
                                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                ></path>
                            </svg>
                        )}
                        Create
                    </button>
                    <button
                        className='ourline:gray-400 rounded-lg py-1.5 px-4 text-gray-600 outline outline-1 -outline-offset-1 hover:text-gray-500'
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
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
