'use client'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import Header from './Header'


function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
<Provider store={store}>
  {children}
    </Provider>
  )
}

export default ClientProvider