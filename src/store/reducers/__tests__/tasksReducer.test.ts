import { describe, beforeEach, it, expect } from 'vitest'

import { TaskPriorities, TaskStatuses, TasksType } from '../../../types/types.ts'
import { tasksActions, tasksReducer } from '../tasksReducer.ts'
import { todoListsActions } from '../todoListsReducer.ts'

describe('tasksReducer', () => {
  let todoListID_1: string
  let todoListID_2: string
  let initialState: TasksType

  beforeEach(() => {
    todoListID_1 = 'todoListID_1'
    todoListID_2 = 'todoListID_2'

    initialState = {
      [todoListID_1]: [
        {
          id: '1',
          title: 'CSS',
          status: TaskStatuses.New,
          addedDate: new Date().toISOString(),
          deadline: null,
          description: null,
          startDate: new Date().toISOString(),
          priority: TaskPriorities.Low,
          order: -2,
          todoListId: todoListID_1,
        },
        {
          id: '2',
          title: 'JS',
          status: TaskStatuses.Completed,
          addedDate: new Date().toISOString(),
          deadline: null,
          description: null,
          startDate: new Date().toISOString(),
          priority: TaskPriorities.Low,
          order: -1,
          todoListId: todoListID_1,
        },
        {
          id: '3',
          title: 'React',
          status: TaskStatuses.New,
          addedDate: new Date().toISOString(),
          deadline: null,
          description: null,
          startDate: new Date().toISOString(),
          priority: TaskPriorities.Low,
          order: 0,
          todoListId: todoListID_1,
        },
      ],
      [todoListID_2]: [
        {
          id: '1',
          title: 'bread',
          status: TaskStatuses.New,
          addedDate: new Date().toISOString(),
          deadline: null,
          description: null,
          startDate: new Date().toISOString(),
          priority: TaskPriorities.Low,
          order: -2,
          todoListId: todoListID_2,
        },
        {
          id: '2',
          title: 'milk',
          status: TaskStatuses.Completed,
          addedDate: new Date().toISOString(),
          deadline: null,
          description: null,
          startDate: new Date().toISOString(),
          priority: TaskPriorities.Low,
          order: -1,
          todoListId: todoListID_2,
        },
        {
          id: '3',
          title: 'tea',
          status: TaskStatuses.New,
          addedDate: new Date().toISOString(),
          deadline: null,
          description: null,
          startDate: new Date().toISOString(),
          priority: TaskPriorities.Low,
          order: 0,
          todoListId: todoListID_2,
        },
      ],
    }
  })

  it('correct task should be deleted from correct array', () => {
    const action = tasksActions.deleteTask(todoListID_2, '2')
    const endState = tasksReducer(initialState, action)

    expect(endState[todoListID_1]).toHaveLength(3)
    expect(endState[todoListID_2]).toHaveLength(2)
    expect(endState[todoListID_2][0].title).toBe('bread')
    expect(endState[todoListID_2][1].title).toBe('tea')
  })

  it('correct task should be added to correct array', () => {
    const newTaskTitle = 'New Task'

    const action = tasksActions.createTask({
      id: 'test-id',
      title: newTaskTitle,
      status: TaskStatuses.New,
      addedDate: new Date().toISOString(),
      deadline: null,
      description: null,
      startDate: null,
      priority: TaskPriorities.Low,
      order: -3,
      todoListId: todoListID_2,
    })
    const endState = tasksReducer(initialState, action)

    expect(endState[todoListID_1]).toHaveLength(3)
    expect(endState[todoListID_2]).toHaveLength(4)
    expect(endState[todoListID_2][0].id).toBeDefined()
    expect(endState[todoListID_2][0].title).toBe(newTaskTitle)
    expect(endState[todoListID_2][0].status).toBe(TaskStatuses.New)
  })

  it('title of specified task should be changed', () => {
    const newTitleTask = 'New Title'

    const action = tasksActions.updateTask(todoListID_2, '2', { title: newTitleTask })
    const endState = tasksReducer(initialState, action)

    expect(endState[todoListID_1][1].title).toBe('JS')
    expect(endState[todoListID_2][1].title).toBe(newTitleTask)
  })

  it('status of specified task should be changed', () => {
    const action = tasksActions.updateTask(todoListID_2, '2', { status: TaskStatuses.New })
    const endState = tasksReducer(initialState, action)

    expect(endState[todoListID_1][1].status).toBe(TaskStatuses.Completed)
    expect(endState[todoListID_2][1].status).toBe(TaskStatuses.New)
  })

  it('property with todolistId should be deleted', () => {
    const action = todoListsActions.deleteTodoList(todoListID_2)
    const endState = tasksReducer(initialState, action)

    const keys = Object.keys(endState)

    expect(keys).toHaveLength(1)
    expect(endState[todoListID_2]).toBeUndefined()
  })

  it('new array should be added when new todolist is added', () => {
    const action = todoListsActions.createTodoList('New TodoList')
    const endState = tasksReducer(initialState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(key => key !== todoListID_1 && key !== todoListID_2)

    if (!newKey) {
      throw Error('new key should be added')
    }

    expect(keys).toHaveLength(3)
    expect(endState[newKey]).toEqual([])
  })
})
