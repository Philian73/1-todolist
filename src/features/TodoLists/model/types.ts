import { RequestStatusType } from '../../../app/model/types.ts'

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type TodoListDomainType = TodoListType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

export type UpdateTodoListDomainModelType = Partial<
  Omit<TodoListDomainType, 'id' | 'addedDate' | 'order'>
>
