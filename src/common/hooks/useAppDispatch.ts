import { useDispatch } from 'react-redux'

import { AppDispatchType } from '@/app/store'

export const useAppDispatch = () => useDispatch<AppDispatchType>()
