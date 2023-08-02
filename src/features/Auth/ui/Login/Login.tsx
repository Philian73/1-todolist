import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'
import * as Yup from 'yup'

import { useAppDispatch, useAppSelector } from 'common/hooks'
import { authSelectors } from 'features/Auth/model/selectors.ts'
import { authThunks } from 'features/Auth/model/slice.ts'

export const Login = () => {
  const isLoggedIn = useAppSelector(authSelectors.isLoggedIn)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(4, 'Must be at least 4 characters long').required('Required'),
    }),
    onSubmit: () => {
      dispatch(authThunks.login(formik.values))
      formik.resetForm()
    },
  })

  return !isLoggedIn ? (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a
                  href={'https://social-network.samuraijs.com/'}
                  target={'_blank'}
                  rel="noreferrer"
                >
                  {' '}
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                error={formik.touched.email && !!formik.errors.email}
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email ? (
                <Typography fontWeight={500} variant="overline" color="error">
                  {formik.errors.email}
                </Typography>
              ) : null}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                error={formik.touched.password && !!formik.errors.password}
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password ? (
                <Typography variant="overline" color="error">
                  {formik.errors.password}
                </Typography>
              ) : null}
              <FormControlLabel
                label="Remember me"
                control={
                  <Checkbox
                    {...formik.getFieldProps('rememberMe')}
                    checked={formik.values.rememberMe}
                  />
                }
              />
              <Button disabled={!formik.isValid} type="submit" variant="contained" color="primary">
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  ) : (
    <Navigate to="/" />
  )
}
