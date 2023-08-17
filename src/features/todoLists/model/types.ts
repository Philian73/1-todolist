import { RequestStatusType } from '@/app/model'

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
