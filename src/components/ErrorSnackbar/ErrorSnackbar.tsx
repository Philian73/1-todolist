import { SyntheticEvent, forwardRef } from 'react'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { appSelectors } from 'app/model/selectors.ts'
import { appActions } from 'app/model/slice.ts'
import { useAppDispatch, useAppSelector } from 'common/hooks'

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
))

export const ErrorSnackbar = () => {
  const error = useAppSelector(appSelectors.error)
  const dispatch = useAppDispatch()

  // @ts-ignore
  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return

    dispatch(appActions.setAppError({ error: null }))
  }

  return (
    <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  )
}
