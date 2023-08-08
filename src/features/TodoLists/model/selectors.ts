import { AppRootStateType } from '@/app/store'

export const todoListsSelectors = {
  todoLists: (state: AppRootStateType) => state.todoLists,
}
