import { AppRootStateType } from 'app/store.ts'

export const todoListsSelectors = {
  selectTodoLists: (state: AppRootStateType) => state.todoLists,
}
