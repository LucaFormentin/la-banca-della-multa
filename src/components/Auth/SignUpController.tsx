import { Divider } from '@mui/material'
import SignInGoogleBtn from './SignInGoogleBtn'
import SignUpPasswordForm from './SignUpPasswordForm'
import classes from './styles.module.css'

type Props = {
  onChangeAuthMode: () => void
}

const SignUpController = (props: Props) => {
  return (
    <>
      <p className={classes.controller__title}>Sign Up</p>
      <div className={classes.controller__body}>
        <SignInGoogleBtn />
        <Divider className={classes.divider}>OR</Divider>
        <SignUpPasswordForm onFormSubmit={props.onChangeAuthMode} />
        <p className='text-sm'>
          Already have an account?{' '}
          <span className='underline' onClick={props.onChangeAuthMode}>
            Sign In
          </span>
        </p>
      </div>
    </>
  )
}

export default SignUpController
