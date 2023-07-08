import { describe, beforeEach, it, expect } from 'vitest'

import { tasksActions } from '../../features/Tasks/model/actions.ts'
import { tasksReducer } from '../../features/Tasks/model/tasksReducer.ts'
import { TaskPriorities, TaskStatuses, TasksType } from '../../features/Tasks/model/types.ts'
import { todoListsActions } from '../../features/TodoLists/model/actions.ts'

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
          entityStatus: 'idle',
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
          entityStatus: 'idle',
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
          entityStatus: 'idle',
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
          entityStatus: 'idle',
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
          entityStatus: 'idle',
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
          entityStatus: 'idle',
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

    const task = initialState[todoListID_2]['2']

    const action = tasksActions.updateTask(todoListID_2, '2', { ...task, title: newTitleTask })
    const endState = tasksReducer(initialState, action)

    expect(endState[todoListID_1][1].title).toBe('JS')
    expect(endState[todoListID_2][1].title).toBe(newTitleTask)
  })

  it('status of specified task should be changed', () => {
    const task = initialState[todoListID_2]['2']

    const action = tasksActions.updateTask(todoListID_2, '2', {
      ...task,
      status: TaskStatuses.New,
    })
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
    const action = todoListsActions.createTodoList({
      id: 'some-id',
      title: 'some-title',
      order: 0,
      addedDate: new Date().toISOString(),
    })
    const endState = tasksReducer(initialState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(key => key !== todoListID_1 && key !== todoListID_2)

    if (!newKey) {
      throw Error('new key should be added')
    }

    expect(keys).toHaveLength(3)
    expect(endState[newKey]).toEqual([])
  })

  it('empty arrays should be added when we set todoLists', () => {
    const action = todoListsActions.setTodoLists([
      { id: todoListID_1, title: 'some-title-1', addedDate: new Date().toISOString(), order: -1 },
      { id: todoListID_2, title: 'some-title-2', addedDate: new Date().toISOString(), order: 0 },
    ])
    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys).toHaveLength(2)
    expect(endState[todoListID_1]).toStrictEqual([])
    expect(endState[todoListID_2]).toStrictEqual([])
  })

  it('tasks should be added for todoList', () => {
    const action = tasksActions.setTasks(todoListID_1, initialState[todoListID_1])

    const endState = tasksReducer(
      {
        [todoListID_1]: [],
        [todoListID_2]: [],
      },
      action
    )

    expect(endState[todoListID_1]).toHaveLength(3)
    expect(endState[todoListID_2]).toHaveLength(0)
  })
})
