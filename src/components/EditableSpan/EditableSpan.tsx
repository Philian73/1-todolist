import { ChangeEvent, KeyboardEvent, FocusEvent, FC, useState, memo } from 'react'

import TextField from '@mui/material/TextField'

type PropsType = {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}
export const EditableSpan: FC<PropsType> = memo(({ value, onChange, disabled }) => {
  const [inputValue, setInputValue] = useState('')
  const [editMode, setEditMode] = useState(false)

  const toggleEditMode = () => {
    if (disabled) return

    if (value !== inputValue) {
      editMode ? onChange(inputValue) : setInputValue(value)
    }

    setEditMode(!editMode)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && toggleEditMode()
  }
  const onFocusHandler = (e: FocusEvent<HTMLInputElement>) => e.target.select()

  return editMode ? (
    <TextField
      variant="standard"
      type="text"
      value={inputValue}
      autoFocus
      onChange={onChangeHandler}
      onBlur={toggleEditMode}
      onKeyDown={onKeyDownHandler}
      onFocus={onFocusHandler}
    />
  ) : (
    <span onDoubleClick={toggleEditMode}>{value}</span>
  )
})
