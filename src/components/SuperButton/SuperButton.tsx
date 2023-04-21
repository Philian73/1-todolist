import { FC } from 'react'

type PropsType = {
  name: string
  onClick: () => void
  disabled?: boolean
  className?: string
}
export const SuperButton: FC<PropsType> = ({ name, onClick, disabled, className }) => {
  return (
    <button className={className ? className : undefined} onClick={onClick} disabled={disabled}>
      {name}
    </button>
  )
}
