import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import './styles/index.css'

import App from './App'
import { store } from './store/store.ts'

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)
