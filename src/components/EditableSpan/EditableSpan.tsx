import { ChangeEvent, KeyboardEvent, FocusEvent, FC, useState } from 'react'

type PropsType = {
  title: string
  changeTitle: (title: string) => void
}
export const EditableSpan: FC<PropsType> = ({ title, changeTitle }) => {
  const [inputValue, setInputValue] = useState('')
  const [editMode, setEditMode] = useState(false)

  const activateEditMode = () => {
    setEditMode(true)
    setInputValue(title)
  }
  const activateViewMode = () => {
    changeTitle(inputValue)
    setEditMode(false)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) =>
    e.key === 'Enter' && activateViewMode()
  const onFocusHandler = (e: FocusEvent<HTMLInputElement>) => e.target.select()

  return editMode ? (
    <input
      type="text"
      value={inputValue}
      autoFocus
      onChange={onChangeHandler}
      onBlur={activateViewMode}
      onKeyDown={onKeyDownHandler}
      onFocus={onFocusHandler}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{title}</span>
  )
}
