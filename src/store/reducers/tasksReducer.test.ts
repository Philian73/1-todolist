import { TasksType } from '../../App.tsx'

import { tasksActions, tasksReducer } from './tasksReducer.ts'

test('correct task should be deleted from correct array', () => {
  const initialState: TasksType = {
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

test('correct task should be added to correct array', () => {
  const startState: TasksType = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  }
  const newTaskTitle = 'New Task'

  const action = tasksActions.addTask('todolistId2', newTaskTitle)

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1']).toHaveLength(3)
  expect(endState['todolistId2']).toHaveLength(4)
  expect(endState['todolistId2'][0].id).toBeDefined()
  expect(endState['todolistId2'][0].title).toBe(newTaskTitle)
  expect(endState['todolistId2'][0].isDone).toBeFalsy()
})
