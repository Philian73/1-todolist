import './styles/App.css'

import Container from '@mui/material/Container'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ButtonAppBar, ErrorSnackbar } from '../components'
import { Login } from '../features/Auth'
import { TodoLists } from '../features/TodoLists'

const App = () => {
  return (
    <div className="App">
      <ErrorSnackbar />
      <ButtonAppBar />
      <Container fixed>
        <Routes>
          <Route path="/" element={<TodoLists />} />
          <Route path="/login" element={<Login />} />

          <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />

          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
