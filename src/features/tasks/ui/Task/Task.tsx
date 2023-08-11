import { ChangeEvent, FC, memo, useCallback } from 'react'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'

import { TaskDomainType, TaskStatuses, tasksThunks } from '../../model'

import { useAppDispatch } from '@/common/hooks'
import { EditableSpan } from '@/common/ui'

type PropsType = {
  task: TaskDomainType
  status: boolean
}
export const Task: FC<PropsType> = memo(({ task, status }) => {
  const { id: taskID, todoListId: todoListID } = task

  const dispatch = useAppDispatch()

  const deleteTask = useCallback(() => {
    dispatch(tasksThunks.deleteTask({ todoListID, taskID }))
  }, [dispatch, todoListID, taskID])

  const updateStatusTask = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        tasksThunks.updateTask({
          todoListID,
          taskID,
          data: { status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New },
        })
      )
    },
    [dispatch, todoListID, taskID]
  )

  const updateTitleTask = useCallback(
    (title: string) => {
      dispatch(tasksThunks.updateTask({ todoListID, taskID, data: { title } }))
    },
    [dispatch, todoListID, taskID]
  )

  const disabledCondition = status || task.entityStatus === 'loading'

  return (
    <ListItem
      key={taskID}
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