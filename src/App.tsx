import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { onAuthStateChanged } from 'firebase/auth'
import { DocumentData } from 'firebase/firestore'
import { auth } from './api/firebase'
import { getLists } from './api'

import { LoginPage, TodoListsPage } from './pages'

const App = () => {
    const [lists, setLists] = React.useState<{ loading: boolean; value: DocumentData[] }>({ loading: true, value: [] })

    React.useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                getLists(auth.currentUser?.uid, lists => {
                    setLists({ loading: false, value: lists })
                })
            }
        })
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<TodoListsPage lists={lists} />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<LoginPage register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
