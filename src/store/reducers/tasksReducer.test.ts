import { TasksType } from '../../types/types.ts'

import { tasksActions, tasksReducer } from './tasksReducer.ts'
import { todoListsActions } from './todoListsReducer.ts'

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
          status: 0,
          addedDate: new Date().toISOString(),
          deadline: null,
          description: null,
          startDate: new Date().toISOString(),
          priority: 1,
          order: -2,
          todoListId: todoListID_1,
        },
        {
          id: '2',
          title: 'JS',
          status: 2,
          addedDate: new Date().toISOString(),
          deadline: null,
          description: null,
          startDate: new Date().toISOString(),
          priority: 1,
          order: -1,
          todoListId: todoListID_1,
        },
        {
          id: '3',
          title: 'React',
          status: 0,
          addedDate: new Date().toISOString(),
          deadline: null,
          description: null,
          startDate: new Date().toISOString(),
          priority: 1,
          order: 0,
          todoListId: todoListID_1,
        },
      ],
      [todoListID_2]: [
        {
          id: '1',
          title: 'bread',
          status: 0,
          addedDate: new Date().toISOString(),
          deadline: null,
          description: null,
          startDate: new Date().toISOString(),
          priority: 1,
          order: -2,
          todoListId: todoListID_2,
        },
        {
          id: '2',
          title: 'milk',
          status: 2,
          addedDate: new Date().toISOString(),
          deadline: null,
          description: null,
          startDate: new Date().toISOString(),
          priority: 1,
          order: -1,
          todoListId: todoListID_2,
        },
        {
          id: '3',
          title: 'tea',
          status: 0,
          addedDate: new Date().toISOString(),
          deadline: null,
          description: null,
          startDate: new Date().toISOString(),
          priority: 1,
          order: 0,
          todoListId: todoListID_2,
        },
      ],
    }
  })

  it('correct task should be deleted from correct array', () => {
    const action = tasksActions.removeTask(todoListID_2, '2')
    const endState = tasksReducer(initialState, action)

    expect(endState[todoListID_1]).toHaveLength(3)
    expect(endState[todoListID_2]).toHaveLength(2)
    expect(endState[todoListID_2][0].title).toBe('bread')
    expect(endState[todoListID_2][1].title).toBe('tea')
  })

  it('correct task should be added to correct array', () => {
    const newTaskTitle = 'New Task'

    const action = tasksActions.addTask({
      id: 'test-id',
      title: newTaskTitle,
      status: 0,
      addedDate: new Date().toISOString(),
      deadline: null,
      description: null,
      startDate: null,
      priority: 1,
      order: -3,
      todoListId: todoListID_2,
    })
    const endState = tasksReducer(initialState, action)

    expect(endState[todoListID_1]).toHaveLength(3)
    expect(endState[todoListID_2]).toHaveLength(4)
    expect(endState[todoListID_2][0].id).toBeDefined()
    expect(endState[todoListID_2][0].title).toBe(newTaskTitle)
    expect(endState[todoListID_2][0].status).toBe(0)
  })

  it('title of specified task should be changed', () => {
    const newTitleTask = 'New Title'

    const action = tasksActions.changeTitleTask(todoListID_2, '2', newTitleTask)
    const endState = tasksReducer(initialState, action)

    expect(endState[todoListID_1][1].title).toBe('JS')
    expect(endState[todoListID_2][1].title).toBe(newTitleTask)
  })

  it('status of specified task should be changed', () => {
    const action = tasksActions.changeStatusTask(todoListID_2, '2', 0)
    const endState = tasksReducer(initialState, action)

    expect(endState[todoListID_1][1].status).toBe(2)
    expect(endState[todoListID_2][1].status).toBe(0)
  })

  it('property with todolistId should be deleted', () => {
    const action = todoListsActions.removeTodoList(todoListID_2)
    const endState = tasksReducer(initialState, action)

    const keys = Object.keys(endState)

    expect(keys).toHaveLength(1)
    expect(endState[todoListID_2]).toBeUndefined()
  })

  it('new array should be added when new todolist is added', () => {
    const action = todoListsActions.addTodoList('New TodoList')
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
