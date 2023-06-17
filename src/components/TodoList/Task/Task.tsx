import { ChangeEvent, FC, memo, useCallback } from 'react'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import { useDispatch } from 'react-redux'

import { tasksActions } from '../../../store/reducers/tasksReducer.ts'
import { TaskType } from '../../../types/types.ts'
import { EditableSpan } from '../../EditableSpan/EditableSpan.tsx'

type PropsType = {
  todoListID: string
  task: TaskType
}
export const Task: FC<PropsType> = memo(({ todoListID, task }) => {
  const dispatch = useDispatch()

  const removeTask = useCallback(() => {
    dispatch(tasksActions.removeTask(todoListID, task.id))
  }, [dispatch, task.id])
  const changeStatusTask = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(tasksActions.changeStatusTask(todoListID, task.id, e.currentTarget.checked))
    },
    [dispatch, task.id]
  )
  const changeTitleTask = useCallback(
    (newTitle: string) => {
      dispatch(tasksActions.changeTitleTask(todoListID, task.id, newTitle))
    },
    [dispatch, task.id]
  )

  return (
    <ListItem
      key={task.id}
      divider
      disablePadding
      disableGutters
      secondaryAction={
        <IconButton size="small" onClick={removeTask}>
          <DeleteForeverIcon fontSize="small" />
        </IconButton>
      }
    >
      <Checkbox size="small" checked={task.isDone} onChange={changeStatusTask} />
      <EditableSpan value={task.title} onChange={changeTitleTask} />
    </ListItem>
  )
})
