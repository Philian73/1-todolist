import { ChangeEvent, FC, useState } from 'react'

type PropsType = {
  title: string
  changeTitle: (title: string) => void
}
export const EditableSpan: FC<PropsType> = ({ title, changeTitle }) => {
  const [inputValue, setInputValue] = useState('')
  const [editMode, setEditMode] = useState(false)

  const activateEditMode = () => {
    setInputValue(title)
    setEditMode(true)
  }
  const activateViewMode = () => {
    changeTitle(inputValue)
    setEditMode(false)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)

  return editMode ? (
    <input type="text" value={inputValue} onChange={onChangeHandler} onBlur={activateViewMode} />
  ) : (
    <span onDoubleClick={activateEditMode}>{title}</span>
  )
}
