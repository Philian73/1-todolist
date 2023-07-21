import { expect, test } from 'vitest'

import { tasksReducer } from '../../features/Tasks/model/tasksReducer.ts'
import { TaskPriorities, TaskStatuses, TasksType } from '../../features/Tasks/model/types.ts'
import { todoListsActions } from '../../features/TodoLists/model/actions.ts'
import { todoListsReducer } from '../../features/TodoLists/model/todoListsReducer.ts'
import { TodoListDomainType } from '../../features/TodoLists/model/types.ts'

test('ids should be equals', () => {
  const initialTasksState: TasksType = {}
  const initialTodoListsState: TodoListDomainType[] = []

  const action = todoListsActions.createTodoList({
    id: 'some-id',
    title: 'some-title',
    order: 0,
    addedDate: new Date().toISOString(),
  })

  const endTasksState = tasksReducer(initialTasksState, action)
  const endTodoListsState = todoListsReducer(initialTodoListsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodoLists = endTodoListsState[0].id

  expect(idFromTasks).toBe(action.payload.todoList.id)
  expect(idFromTodoLists).toBe(action.payload.todoList.id)
})

test('TodoLists and their tasks should been cleared', () => {
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

  const action = todoListsActions.clearTodoLists()

  const endTasksState = tasksReducer(initialTasksState, action)
  const endTodoListsState = todoListsReducer(initialTodoListsState, action)

  const keys = Object.keys(endTasksState)

  expect(keys).toHaveLength(0)
  expect(endTodoListsState).toHaveLength(0)
})
