import { TasksType } from '../../App.tsx'

import { tasksActions, tasksReducer } from './tasksReducer.ts'
import { todoListsActions } from './todoListsReducer.ts'

describe('tasksReducer', () => {
  let initialState: TasksType

  beforeEach(() => {
    initialState = {
      todoListID_1: [
        { id: '1', title: 'CSS', isDone: false },
        { id: '2', title: 'JS', isDone: true },
        { id: '3', title: 'React', isDone: false },
      ],
      todoListID_2: [
        { id: '1', title: 'bread', isDone: false },
        { id: '2', title: 'milk', isDone: true },
        { id: '3', title: 'tea', isDone: false },
      ],
    }
  })

  it('correct task should be deleted from correct array', () => {
    const action = tasksActions.removeTask('todoListID_2', '2')

    const endState = tasksReducer(initialState, action)

    expect(endState).toEqual({
      todoListID_1: [
        { id: '1', title: 'CSS', isDone: false },
        { id: '2', title: 'JS', isDone: true },
        { id: '3', title: 'React', isDone: false },
      ],
      todoListID_2: [
        { id: '1', title: 'bread', isDone: false },
        { id: '3', title: 'tea', isDone: false },
      ],
    })
  })

  it('correct task should be added to correct array', () => {
    const newTaskTitle = 'New Task'

    const action = tasksActions.addTask('todoListID_2', newTaskTitle)

    const endState = tasksReducer(initialState, action)

    expect(endState['todoListID_1']).toHaveLength(3)
    expect(endState['todoListID_2']).toHaveLength(4)
    expect(endState['todoListID_2'][0].id).toBeDefined()
    expect(endState['todoListID_2'][0].title).toBe(newTaskTitle)
    expect(endState['todoListID_2'][0].isDone).toBeFalsy()
  })

  it('title of specified task should be changed', () => {
    const newTitleTask = 'New Title'

    const action = tasksActions.changeTitleTask('todoListID_2', '2', newTitleTask)

    const endState = tasksReducer(initialState, action)

    expect(endState['todoListID_1'][1].title).toBe('JS')
    expect(endState['todoListID_2'][1].title).toBe(newTitleTask)
  })

  it('status of specified task should be changed', () => {
    const action = tasksActions.changeStatusTask('todoListID_2', '2', false)

    const endState = tasksReducer(initialState, action)

    expect(endState['todoListID_1'][1].isDone).toBeTruthy()
    expect(endState['todoListID_2'][1].isDone).toBeFalsy()
  })

  it('property with todolistId should be deleted', () => {
    const action = todoListsActions.removeTodoList('todoListID_2')

    const endState = tasksReducer(initialState, action)

    const keys = Object.keys(endState)

    expect(keys).toHaveLength(1)
    expect(endState['todoListID_2']).toBeUndefined()
  })

  it('new array should be added when new todolist is added', () => {
    const action = todoListsActions.addTodoList('New TodoList')

    const endState = tasksReducer(initialState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(key => key !== 'todoListID_1' && key !== 'todoListID_2')

    if (!newKey) {
      throw Error('new key should be added')
    }

    expect(keys).toHaveLength(3)
    expect(endState[newKey]).toEqual([])
  })
})
