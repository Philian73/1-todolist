import { ChangeEvent, KeyboardEvent, FC, useState, memo } from 'react'

import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'

type PropsType = {
  addItem: (title: string) => void
  disabled?: boolean
}
export const AddItemForm: FC<PropsType> = memo(({ addItem, disabled }) => {
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const addItemCallback = () => {
    if (error) return

    if (title.trim()) {
      addItem(title.trim())
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

  const inputPlaceholder = error ? error : 'Enter the title'

  return (
    <div>
      <TextField
        disabled={disabled}
        variant="outlined"
        size="small"
        label={inputPlaceholder}
        error={!!error}
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
      />
      <IconButton
        disabled={disabled || !title.trim().length}
        color="primary"
        size="small"
        onClick={addItemCallback}
      >
        <AddBoxIcon />
      </IconButton>
    </div>
  )
})
