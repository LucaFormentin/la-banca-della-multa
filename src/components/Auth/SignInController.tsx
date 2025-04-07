import { Divider } from '@mui/material'
import SignInGoogleBtn from './SignInGoogleBtn'
import SignInPasswordForm from './SignInPasswordForm'
import classes from './auth.module.css'

type Props = {
  onChangeAuthMode: () => void
}

const SignInController = (props: Props) => {
  return (
    <>
      <p className={classes.controller__title}>Sign In</p>
      <div className={classes.controller__body}>
        <SignInGoogleBtn />
        <Divider className={classes.divider}>OR</Divider>
        <SignInPasswordForm />
        <p className='text-sm'>
          Don't have an account?{' '}
          <span className='underline' onClick={props.onChangeAuthMode}>
            Sign Up
          </span>
        </p>
      </div>
    </>
  )
}

export default SignInController
