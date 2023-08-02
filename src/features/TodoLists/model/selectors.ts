import { AppRootStateType } from 'app/store.ts'

export const todoListsSelectors = {
  todoLists: (state: AppRootStateType) => state.todoLists,
}
