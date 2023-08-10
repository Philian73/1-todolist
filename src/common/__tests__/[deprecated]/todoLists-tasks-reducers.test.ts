import { expect, test } from 'vitest'

import { TaskPriorities, TaskStatuses, TasksType } from '@/features/tasks/model'
import { _tasksReducer } from '@/features/tasks/model/[deprecated]'
import { TodoListDomainType } from '@/features/todoLists/model'
import { _todoListsReducer, _todoListsActions } from '@/features/todoLists/model/[deprecated]'

test('ids should be equals', () => {
  const initialTasksState: TasksType = {}
  const initialTodoListsState: TodoListDomainType[] = []

  const action = _todoListsActions.createTodoList({
    id: 'some-id',
    title: 'some-title',
    order: 0,
    addedDate: new Date().toISOString(),
  })

  const endTasksState = _tasksReducer(initialTasksState, action)
  const endTodoListsState = _todoListsReducer(initialTodoListsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodoLists = endTodoListsState[0].id

  expect(idFromTasks).toBe(action.payload.todoList.id)
  expect(idFromTodoLists).toBe(action.payload.todoList.id)
})

test('todoLists and their tasks should been cleared', () => {
  const initialTasksState: TasksType = {
    ['1']: [
      {
        id: '1',
        entityStatus: 'idle',
        order: 0,
        addedDate: new Date().toISOString(),
        title: 'some-title',
        startDate: '',
        status: TaskStatuses.New,
        deadline: '',
        priority: TaskPriorities.Low,
        description: '',
        todoListId: '1',
      },
    ],
  }
  const initialTodoListsState: TodoListDomainType[] = [
    {
      id: '1',
      title: 'test',
      entityStatus: 'idle',
      order: 0,
      addedDate: new Date().toISOString(),
      filter: 'all',
    },
  ]

  const action = _todoListsActions.clearTodoLists()

  const endTasksState = _tasksReducer(initialTasksState, action)
  const endTodoListsState = _todoListsReducer(initialTodoListsState, action)

  const keys = Object.keys(endTasksState)

  expect(keys).toHaveLength(0)
  expect(endTodoListsState).toHaveLength(0)
})
