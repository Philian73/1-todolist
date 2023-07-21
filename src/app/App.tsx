import './styles/App.css'

import { useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ButtonAppBar, ErrorSnackbar } from '../components'
import { Login } from '../features/Auth'
import { authThunks } from '../features/Auth/model/thunks.ts'
import { TodoLists } from '../features/TodoLists'

import { useAppDispatch, useAppSelector } from './hooks/hooks.ts'

const App = () => {
  const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authThunks.me())
  }, [])

  return isInitialized ? (
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
  ) : (
    <Grid container justifyContent={'center'} alignContent={'center'} minHeight={'100vh'}>
      <CircularProgress />
    </Grid>
  )
}

export default App
