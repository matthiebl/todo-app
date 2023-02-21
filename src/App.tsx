import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TodoListsPage } from './pages'

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<TodoListsPage />} />
        </Routes>
    </BrowserRouter>
)

export default App
