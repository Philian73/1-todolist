import './index.css'

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import App from '@/app/App'
import { store } from '@/app/store'

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
)
