import { useDispatch } from 'react-redux'

import { AppDispatchType } from 'app/store.ts'

export const useAppDispatch = () => useDispatch<AppDispatchType>()
