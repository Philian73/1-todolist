import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import LinearProgress from '@mui/material/LinearProgress'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { useAppSelector } from '../../app/hooks/hooks.ts'
import { RequestStatusType } from '../../app/model/types.ts'

export const ButtonAppBar = () => {
  const status = useAppSelector<RequestStatusType>(state => state.app.status)

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
          <Button color="inherit">Login</Button>
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
