import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage, TodoListsPage } from './pages'

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<TodoListsPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<LoginPage register />} />
        </Routes>
    </BrowserRouter>
)

export default App
