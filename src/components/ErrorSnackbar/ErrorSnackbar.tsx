import { SyntheticEvent, forwardRef } from 'react'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { appActions } from '../../app/model/actions.ts'

import { useAppDispatch } from 'common/hooks/useAppDispatch.ts'
import { useAppSelector } from 'common/hooks/useAppSelector.ts'

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
))

export const ErrorSnackbar = () => {
  const error = useAppSelector<string | null>(state => state.app.error)
  const dispatch = useAppDispatch()

  // @ts-ignore
  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return

    dispatch(appActions.setAppError(null))
  }

  return (
    <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  )
}
