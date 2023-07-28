import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import LinearProgress from '@mui/material/LinearProgress'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { RequestStatusType } from '../../app/model/types.ts'
import { authThunks } from '../../features/Auth/model/thunks.ts'

import { useAppDispatch } from 'common/hooks/useAppDispatch.ts'
import { useAppSelector } from 'common/hooks/useAppSelector.ts'

export const Header = () => {
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const status = useAppSelector<RequestStatusType>(state => state.app.status)

  const dispatch = useAppDispatch()

  const logout = () => dispatch(authThunks.logout())

  return (
    <Box sx={{ flexGrow: 1, position: 'relative' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TodoList
          </Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={logout}>
              Log Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {status === 'loading' && (
        <LinearProgress
          color="secondary"
          sx={{ position: 'absolute', bottom: '-7%', left: 0, width: '100%' }}
        />
      )}
    </Box>
  )
}
