import { ChangeEvent, FC, memo, useCallback } from 'react'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'

import { useAppDispatch } from '../../../hooks/hooks.ts'
import { deleteTask, updateTask } from '../../../store/reducers/tasksReducer.ts'
import { TaskStatuses, TaskType } from '../../../types/types.ts'
import { EditableSpan } from '../../EditableSpan/EditableSpan.tsx'

type PropsType = {
  todoListID: string
  task: TaskType
}
export const Task: FC<PropsType> = memo(({ todoListID, task }) => {
  const dispatch = useAppDispatch()

  const removeTask = useCallback(() => {
    dispatch(deleteTask(todoListID, task.id))
  }, [dispatch, todoListID, task.id])

  const changeStatusTask = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        updateTask(todoListID, task.id, {
          status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
        })
      )
    },
    [dispatch, todoListID, task.id]
  )

  const changeTitleTask = useCallback(
    (newTitle: string) => {
      dispatch(updateTask(todoListID, task.id, { title: newTitle }))
    },
    [dispatch, todoListID, task.id]
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
      <Checkbox
        size="small"
        checked={task.status === TaskStatuses.Completed}
        onChange={changeStatusTask}
      />
      <EditableSpan value={task.title} onChange={changeTitleTask} />
    </ListItem>
  )
})
