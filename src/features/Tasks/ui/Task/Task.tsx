import { ChangeEvent, FC, memo, useCallback } from 'react'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'

import { useAppDispatch } from '../../../../app/hooks/hooks.ts'
import { EditableSpan } from '../../../../components/EditableSpan/EditableSpan.tsx'
import { tasksThunks } from '../../model/thunks.ts'
import { TaskDomainType, TaskStatuses } from '../../model/types.ts'

type PropsType = {
  task: TaskDomainType
}
export const Task: FC<PropsType> = memo(({ task }) => {
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

  const disabledCondition = task.entityStatus === 'loading'

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
