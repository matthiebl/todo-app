import React from 'react'
import { useNavigate } from 'react-router-dom'

import { onAuthStateChanged } from 'firebase/auth'
import { DocumentData } from 'firebase/firestore'
import { auth } from '../api/firebase'
import { createList, getLists } from '../api'
import { CloseButton, Modal, PageWrapper, Pill, PrimaryButton } from '../components'
import { Item } from './TodoList'

interface TodoListsPageProps {
    lists: { loading: boolean; value: DocumentData[] }
    setLists: (lists: { loading: boolean; value: DocumentData[] }) => any
}

export const TodoListsPage: React.FC<TodoListsPageProps> = ({ lists, setLists }) => {
    const navigate = useNavigate()

    React.useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                getLists(auth.currentUser?.uid, lists => {
                    setLists({ loading: false, value: lists })
                })
            } else {
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
                        <PrimaryButton onClick={() => setOpen(true)}>New List</PrimaryButton>
                    </div>
                </div>

                <div className='border-t border-gray-200' />

                {!lists.loading && lists.value.length > 0 && (
                    <div className='py-4 px-8 pb-3'>
                        <h4 className='mb-2'>Recent Lists</h4>

                        <div className='flex w-full items-center gap-6 overflow-y-auto pb-3'>
                            {lists.value.slice(0, 4).map(list => (
                                <RecentList
                                    key={list.id + 'Recent'}
                                    id={list.id}
                                    color={list.color}
                                    title={list.title}
                                    incomplete={list.items.filter((it: Item) => !it.checked).length}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div className='flex h-10 items-center border-y border-gray-200 bg-gray-100 px-8 text-sm font-semibold'>
                    <div className='w-full truncate pr-4 sm:w-8/12'>Lists</div>
                    <div className='hidden w-3/12 truncate text-right sm:block'>Last Updated</div>
                </div>

                {lists.loading && (
                    <div className='flex h-10 items-center justify-center gap-1 border-b border-gray-100 px-8 text-sm text-gray-400'>
                        Loading your todo lists...
                    </div>
                )}
                {!lists.loading && lists.value.length === 0 && (
                    <div className='flex h-10 items-center justify-center gap-1 border-b border-gray-100 px-8 text-sm text-gray-400'>
                        You have no todo lists -{' '}
                        <button className='text-indigo-600 hover:underline' onClick={() => setOpen(true)}>
                            Create one
                        </button>
                    </div>
                )}
                {!lists.loading &&
                    lists.value.map(list => (
                        <TodoListItem
                            key={list.id}
                            id={list.id}
                            color={list.color}
                            title={list.title}
                            lastEdit={list.editedAt.toDate().toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        />
                    ))}
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
        <Modal open={open} controller={setOpen}>
            <div className='flex w-full justify-between'>
                <h2 className='truncate text-2xl font-semibold'>Create a new todo list</h2>
                <CloseButton onClick={() => setOpen(false)} />
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
                <div className='flex flex-wrap gap-2'>
                    <Pill text='Red' colour='red' selected={tag == 'red'} onClick={() => onChangeTag('red')} />
                    <Pill
                        text='Orange'
                        colour='orange'
                        selected={tag == 'orange'}
                        onClick={() => onChangeTag('orange')}
                    />
                    <Pill
                        text='Yellow'
                        colour='yellow'
                        selected={tag == 'yellow'}
                        onClick={() => onChangeTag('yellow')}
                    />
                    <Pill text='Green' colour='green' selected={tag == 'green'} onClick={() => onChangeTag('green')} />
                    <Pill text='Blue' colour='blue' selected={tag == 'blue'} onClick={() => onChangeTag('blue')} />
                    <Pill
                        text='Purple'
                        colour='purple'
                        selected={tag == 'purple'}
                        onClick={() => onChangeTag('purple')}
                    />
                    <Pill text='Pink' colour='pink' selected={tag == 'pink'} onClick={() => onChangeTag('pink')} />
                </div>
            </div>

            <div className='mt-10 flex flex-row-reverse gap-2'>
                <button
                    disabled={title === '' || tag === '' || auth.currentUser === null || creating}
                    className='flex items-center justify-center rounded-lg bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700 disabled:bg-gray-400'
                    onClick={() => {
                        if (title === '' || tag === '' || auth.currentUser === null) return
                        setCreating(true)
                        createList(auth.currentUser.uid, title, tag, ref => {
                            setCreating(false)
                            navigate(`/list/${ref.id}`)
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
                    className='ourline:gray-400 rounded-lg py-1.5 px-3 text-sm text-gray-600 outline outline-1 -outline-offset-1 hover:text-gray-500'
                    onClick={() => setOpen(false)}
                >
                    Cancel
                </button>
            </div>
        </Modal>
    )
}

interface RecentListProps {
    id: string
    color: string
    title: string
    incomplete: number
}

const RecentList: React.FC<RecentListProps> = ({ id, color, title, incomplete }) => {
    const navigate = useNavigate()

    return (
        <a
            href={'/list/' + id}
            onClick={event => {
                event.preventDefault()
                navigate('/list/' + id)
            }}
            className='flex w-48 min-w-[192px] rounded-lg border border-gray-200'
        >
            <div className={'w-4 rounded-l-lg ' + colourMap[color]} />
            <div className='w-full overflow-hidden py-2 px-4'>
                <p className='truncate text-sm' title={title}>
                    {title}
                </p>
                <p className='truncate text-xs text-gray-400'>
                    {incomplete ? `${incomplete} items left` : 'Completed'}
                </p>
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
    const navigate = useNavigate()

    return (
        <a
            href={'/list/' + id}
            onClick={event => {
                event.preventDefault()
                navigate('/list/' + id)
            }}
            className='flex h-10 items-center border-b border-gray-100 px-8 text-sm'
        >
            <div className='flex w-full items-center gap-3 truncate pr-4 sm:w-8/12'>
                <div className={'h-2.5 w-2.5 rounded-full ' + colourMap[color]} />
                {title}
            </div>
            <div className='hidden w-3/12 truncate text-right text-gray-400 sm:block'>{lastEdit}</div>
            <div className='hidden w-1/12 truncate text-right text-indigo-600 sm:block'>Edit</div>
        </a>
    )
}

const colourMap: Record<string, string> = {
    red: 'bg-red-600',
    orange: 'bg-orange-500',
    yellow: 'bg-yellow-500',
    green: 'bg-lime-500',
    blue: 'bg-sky-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
}
