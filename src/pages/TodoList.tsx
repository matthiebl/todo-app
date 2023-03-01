import React from 'react'
import { useParams } from 'react-router-dom'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../api/firebase'
import { getList } from '../api'

import { PageWrapper } from '../components'
import { DocumentData } from 'firebase/firestore'

interface TodoListPageProps {}

export const TodoListPage: React.FC<TodoListPageProps> = ({}) => {
    const params = useParams()

    const [list, setList] = React.useState<{ loading: boolean; value: DocumentData }>({ loading: true, value: {} })

    React.useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user && params.id) {
                getList(params.id, list => {
                    setList({ loading: false, value: list })
                })
            }
        })
    })

    return (
        <PageWrapper>
            <main className='h-full w-full max-w-3xl overflow-y-auto'>
                <div className='py-4 px-8'>
                    <h1 className='truncate text-2xl font-semibold'>
                        {list.loading ? 'Loading...' : list.value.title}
                    </h1>
                </div>

                <div className='border-t border-gray-200' />
            </main>
        </PageWrapper>
    )
}
