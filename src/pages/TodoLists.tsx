import React from 'react'

interface TodoListsPageProps {}

export const TodoListsPage: React.FC<TodoListsPageProps> = ({}) => {
    return (
        <div className='flex h-screen w-screen'>
            <nav className='flex h-full w-24 bg-gray-800'></nav>
            <main className='w-full'></main>
        </div>
    )
}
