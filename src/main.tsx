import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import axios, { InternalAxiosRequestConfig } from 'axios'
import { store } from './store/index.ts'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
axios.defaults.baseURL = import.meta.env.VITE_SERVER_BASE_URL_API

const TokenInterceptor = (request: InternalAxiosRequestConfig<any>) => {

  const token = localStorage.getItem('token')

  if (token) {
    request.headers['x-auth-token'] = token
  }

  return request
}

axios.interceptors.request.use(TokenInterceptor)


ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </BrowserRouter>
)
