import { FC } from 'react'

type PropsType = {
  name: string
  onClick: () => void
  disabled?: boolean
}
export const SuperButton: FC<PropsType> = ({ name, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {name}
    </button>
  )
}
