import { ChangeEvent, KeyboardEvent, FC, useState } from 'react'

import { SuperButton } from '../SuperButton/SuperButton'
import s from '../TodoList/TodoList.module.css'

type PropsType = {
  addItem: (title: string) => void
}
export const AddItemForm: FC<PropsType> = ({ addItem }) => {
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const addItemCallback = () => {
    if (error) return

    if (title.trim()) {
      addItem(title)
      setTitle('')
    } else {
      setError('Title is required')
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) addItemCallback()
    if (error && e.key !== ' ') setError(null)
  }

  return (
    <div>
      <input
        className={error ? s.error : ''}
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
      />
      <SuperButton name="+" onClick={addItemCallback} />
      {error && (
        <div>
          <span className={s.errorMessage}>{error}</span>
        </div>
      )}
    </div>
  )
}
