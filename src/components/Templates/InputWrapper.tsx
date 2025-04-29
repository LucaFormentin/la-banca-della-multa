import { type PropsWithChildren } from 'react'
import classes from './styles.module.css'

type InputWrapperProps = PropsWithChildren<{
  label: string
  labelHtmlRef: string
}>

const InputWrapper = ({ children, ...props }: InputWrapperProps) => {
  return (
    <div className={classes.input__wrapper}>
      <label htmlFor={props.labelHtmlRef}>{props.label}</label>
      {children}
    </div>
  )
}

export default InputWrapper
