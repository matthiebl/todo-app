import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../api/firebase'
import { deleteList, getList, updateList } from '../api'

import { CloseButton, Modal, PageWrapper, PrimaryButton } from '../components'
import { DocumentData } from 'firebase/firestore'

interface TodoListPageProps {}

export const TodoListPage: React.FC<TodoListPageProps> = ({}) => {
    const params = useParams()

    const [list, setList] = React.useState<{ loading: boolean; value: DocumentData }>({ loading: true, value: {} })

    const [items, setItems] = React.useState<Item[]>([])
    const [selected, setSelected] = React.useState<number>(-1)
    const [saved, setSaved] = React.useState<boolean>(true)
    const [timeoutId, setTimeoutId] = React.useState<NodeJS.Timeout>()

    const [open, setOpen] = React.useState<boolean>(false)

    React.useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user && params.id) {
                getList(params.id, list => {
                    setList({ loading: false, value: list })
                    setItems(list.items)
                    setSelected(list.items.length - 1)
                })
            }
        })
    }, [])

    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowDown') moveCursorDown()
            else if (event.key === 'ArrowUp') moveCursorUp()
            else if (event.key === 'Enter' && !event.shiftKey && selected >= 0)
                updateChecked(selected, !items[selected].checked)
            else if (event.key === 'Enter' && event.shiftKey) newRow()
            else if (event.key === 'Backspace' && selected >= 0 && items[selected].text === '')
                deleteRow(selected, true)
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [items, selected])

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
        }, 3000)
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

    const newRow = (end?: boolean) => {
        if (selected === -1) end = true
        const newItems = end
            ? [...items, { checked: false, text: '' }]
            : [
                  ...items.slice(0, selected + 1),
                  { checked: false, text: '' },
                  ...items.slice(selected + 1, items.length),
              ]
        saveRequired(newItems)
        setItems(newItems)
        focusRow(end ? newItems.length - 1 : selected + 1)
        if (end || selected + 1 === items.length) {
            unfocusRow(items.length - 1)
            setSelected(newItems.length - 1)
        }
    }

    const deleteRow = (id: number, goBack?: boolean) => {
        const newItems = items.filter((it, i) => i != id)
        saveRequired(newItems)
        setItems(newItems)
        id === newItems.length ? focusRow(id - 1) : goBack && id !== 0 ? focusRow(id - 1) : focusRow(id)
    }

    const focusRow = (id: number) => {
        if (id < 0 || id >= items.length) return
        const allItems: NodeListOf<HTMLInputElement> = document.querySelectorAll('input.todo-item')
        allItems[id].focus()
        setSelected(id)
    }

    const unfocusRow = (id: number) => {
        if (id < 0 || id >= items.length) return
        const allItems: NodeListOf<HTMLInputElement> = document.querySelectorAll('input.todo-item')
        allItems[id].blur()
        setSelected(-1)
    }

    const moveCursorDown = () => {
        focusRow(selected + 1)
    }

    const moveCursorUp = () => {
        focusRow(selected - 1)
    }

    return (
        <PageWrapper>
            <DeleteListModal open={open} setOpen={setOpen} />
            <main className='h-full w-full max-w-3xl'>
                <div className='z-40 sticky top-0 flex flex-col bg-white py-4 px-8 pb-2'>
                    <div className='flex items-center text-sm'>
                        <p data-saved={saved} className='rounded-md text-gray-600 data-[saved]:text-gray-400'>
                            {saved ? 'Saved' : 'Saving changes...'}
                        </p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <h1 className='truncate text-2xl font-semibold'>{list.loading ? '...' : list.value.title}</h1>
                        <PrimaryButton onClick={() => newRow(true)}>Add Item</PrimaryButton>
                    </div>
                    <div className='flex items-center gap-1 pt-1 text-sm'>
                        <button
                            onClick={() => setOpen(true)}
                            className='-ml-2 rounded-md py-0.5 px-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                        >
                            Delete
                        </button>
                    </div>
                </div>

                <div className='sticky top-[104px] border-t border-gray-200' />

                <div className='py-4 px-8'>
                    {items.map((item, id) => (
                        <TodoItem
                            key={id}
                            id={id}
                            item={item}
                            onCheck={ev => updateChecked(id, ev.target.checked)}
                            onUpdate={ev => updateText(id, ev.target.value)}
                            select={setSelected}
                            selected={id === selected}
                            onDelete={deleteRow}
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
    item: Item
    onCheck: React.ChangeEventHandler<HTMLInputElement>
    onUpdate: React.ChangeEventHandler<HTMLInputElement>
    select: (id: number) => any
    selected: boolean
    onDelete: (id: number) => any
}

const TodoItem: React.FC<TodoItemProps> = ({ id, item, onCheck, onUpdate, select, selected, onDelete }) => {
    return (
        <div className='group relative flex h-7 items-center'>
            <input
                id={id.toString()}
                type='checkbox'
                checked={item.checked}
                onChange={onCheck}
                className='peer/check h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-1 focus:ring-indigo-500 disabled:pointer-events-none disabled:border-gray-400 disabled:bg-gray-400 disabled:text-gray-400'
            />
            <input
                type='text'
                value={item.text}
                onChange={onUpdate}
                autoFocus={selected}
                onFocus={() => select(id)}
                onBlur={() => select(-1)}
                className='todo-item ml-2 flex-grow border-0 p-0 text-sm text-gray-900 focus:outline-0 focus:ring-0 peer-checked/check:text-gray-500 peer-checked/check:line-through'
            />
            <button onClick={() => onDelete(id)} className='peer/delete'>
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
                className='peer/move ml-1 hidden h-5 w-5 text-gray-600 hover:cursor-pointer hover:text-gray-800 group-hover:block'
            >
                <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9'
                />
            </svg>
            <div className='absolute -left-2 hidden h-5 w-px group-hover:block group-hover:bg-gray-200 peer-hover/move:bg-sky-300 peer-hover/delete:bg-red-300' />
        </div>
    )
}

interface ModalProps {
    open: boolean
    setOpen: (b: boolean) => any
}

const DeleteListModal: React.FC<ModalProps> = ({ open, setOpen }) => {
    const navigate = useNavigate()
    const params = useParams()

    const onDelete = () => {
        if (params.id) {
            deleteList(params.id, () => {
                navigate('/')
            })
        }
    }

    return (
        <Modal open={open} controller={setOpen}>
            <div className='flex w-full justify-between'>
                <h2 className='truncate text-2xl font-semibold'>Delete List</h2>
                <CloseButton onClick={() => setOpen(false)} />
            </div>

            <p className='mt-2'>Are you sure you want to delete this todo list?</p>

            <div className='mt-2 flex flex-row-reverse gap-2'>
                <button
                    className='flex items-center justify-center rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700'
                    onClick={onDelete}
                >
                    Delete
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
