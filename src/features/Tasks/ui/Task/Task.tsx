import { ChangeEvent, FC, memo, useCallback } from 'react'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'

import { tasksThunks } from '../../model/[deprecated]/thunks.ts'
import { TaskDomainType, TaskStatuses } from '../../model/types.ts'

import { useAppDispatch } from 'common/hooks'
import { EditableSpan } from 'common/ui'

type PropsType = {
  task: TaskDomainType
  status: boolean
}
export const Task: FC<PropsType> = memo(({ task, status }) => {
  const dispatch = useAppDispatch()

  const deleteTask = useCallback(() => {
    dispatch(tasksThunks.deleteTask(task.todoListId, task.id))
  }, [dispatch, task.todoListId, task.id])

  const updateStatusTask = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        tasksThunks.updateTask(task.todoListId, task.id, {
          status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
        })
      )
    },
    [dispatch, task.todoListId, task.id]
  )

  const updateTitleTask = useCallback(
    (title: string) => {
      dispatch(tasksThunks.updateTask(task.todoListId, task.id, { title }))
    },
    [dispatch, task.todoListId, task.id]
  )

  const disabledCondition = status || task.entityStatus === 'loading'

  return (
    <ListItem
      key={task.id}
      divider
      disablePadding
      disableGutters
      secondaryAction={
        <IconButton disabled={disabledCondition} size="small" onClick={deleteTask}>
          <DeleteForeverIcon fontSize="small" />
        </IconButton>
      }
    >
      <Checkbox
        disabled={disabledCondition}
        size="small"
        checked={task.status === TaskStatuses.Completed}
        onChange={updateStatusTask}
      />
      <EditableSpan disabled={disabledCondition} value={task.title} onChange={updateTitleTask} />
    </ListItem>
  )
})
