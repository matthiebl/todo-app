import React from 'react'
import { useParams } from 'react-router-dom'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../api/firebase'
import { getList, updateList } from '../api'

import { PageWrapper, PrimaryButton } from '../components'
import { DocumentData } from 'firebase/firestore'

interface TodoListPageProps {}

export const TodoListPage: React.FC<TodoListPageProps> = ({}) => {
    const params = useParams()

    const [list, setList] = React.useState<{ loading: boolean; value: DocumentData }>({ loading: true, value: {} })

    const [items, setItems] = React.useState<Item[]>([])
    const [saved, setSaved] = React.useState<boolean>(true)

    const [timeoutId, setTimeoutId] = React.useState<NodeJS.Timeout>()

    React.useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user && params.id) {
                getList(params.id, list => {
                    setList({ loading: false, value: list })
                    setItems(list.items)
                })
            }
        })
    }, [])

    const saveRequired = (newItems: Item[]) => {
        setSaved(false)
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        const tid = setTimeout(() => {
            if (params.id) {
                updateList(params.id, newItems)
                setSaved(true)
            }
        }, 5000)
        setTimeoutId(tid)
    }

    const updateChecked = (id: number, checked: boolean) => {
        const newItems = items.map((it, i) => (i == id ? { ...it, checked } : { ...it }))
        saveRequired(newItems)
        setItems(newItems)
    }

    const updateText = (id: number, text: string) => {
        const newItems = items.map((it, i) => (i == id ? { ...it, text } : { ...it }))
        saveRequired(newItems)
        setItems(newItems)
    }

    const onClickNew = () => {
        const newItems = [...items, { checked: false, text: 'New item...' }]
        saveRequired(newItems)
        setItems(newItems)
    }

    const onClickDelete = (id: number) => {
        const newItems = items.filter((it, i) => i != id)
        saveRequired(newItems)
        setItems(newItems)
    }

    return (
        <PageWrapper>
            <main className='h-full w-full max-w-3xl'>
                <div className='sticky top-0 flex flex-col bg-white p-4 px-8'>
                    <div className='flex items-center text-sm'>
                        <p data-saved={saved} className='rounded-md text-gray-600 data-[saved]:text-gray-400'>
                            {saved ? 'Saved' : 'Unsaved changes'}
                        </p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <h1 className='truncate text-2xl font-semibold'>{list.loading ? '...' : list.value.title}</h1>
                        <PrimaryButton onClick={onClickNew}>Add Item</PrimaryButton>
                    </div>
                </div>

                <div className='sticky top-[84px] border-t border-gray-200' />

                <div className='py-4 px-8'>
                    {items.map((item, id) => (
                        <TodoItem
                            key={id}
                            id={id}
                            checked={item.checked}
                            onCheck={ev => updateChecked(id, ev.target.checked)}
                            text={item.text}
                            onUpdate={ev => updateText(id, ev.target.value)}
                            onDelete={onClickDelete}
                        />
                    ))}
                </div>
            </main>
        </PageWrapper>
    )
}

export type Item = {
    checked: boolean
    text: string
}

interface TodoItemProps {
    id: number
    checked: boolean
    onCheck: React.ChangeEventHandler<HTMLInputElement>
    text: string
    onUpdate: React.ChangeEventHandler<HTMLInputElement>
    onDelete: (id: number) => any
}

const TodoItem: React.FC<TodoItemProps> = ({ id, checked, onCheck, text, onUpdate, onDelete }) => {
    return (
        <div className='group flex h-7 items-center py-1'>
            <input
                id={id.toString()}
                type='checkbox'
                checked={checked}
                onChange={onCheck}
                className='peer h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-1 focus:ring-indigo-500 disabled:pointer-events-none disabled:border-gray-400 disabled:bg-gray-400 disabled:text-gray-400'
            />
            <input
                type='text'
                value={text}
                onChange={onUpdate}
                className='ml-2 flex-grow border-0 p-0 text-sm text-gray-900 focus:outline-0 focus:ring-0 peer-checked:text-gray-500 peer-checked:line-through'
            />
            <button onClick={() => onDelete(id)}>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='hidden h-5 w-5 text-gray-600 hover:cursor-pointer hover:text-gray-800 group-hover:block'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                    />
                </svg>
            </button>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='ml-1 hidden h-5 w-5 text-gray-600 hover:cursor-pointer hover:text-gray-800 group-hover:block'
            >
                <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9'
                />
            </svg>
        </div>
    )
}
