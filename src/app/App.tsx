import { useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Navigate, Route, Routes } from 'react-router-dom'

import { appSelectors } from './model'

import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { ErrorSnackbar, Header } from '@/components'
import { authThunks } from '@/features/auth/model'
import { Login } from '@/features/auth/ui'
import { TodoLists } from '@/features/todoLists/ui'

const App = () => {
  const isInitialized = useAppSelector(appSelectors.isInitialized)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authThunks.initializeApp())
  }, [])

  return isInitialized ? (
    <div className="App">
      <ErrorSnackbar />
      <Header />
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
