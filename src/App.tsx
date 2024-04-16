import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import AppRouter from './Router'
import Navbar from './components/navbar/Navbar'
import { AppDispatch, RootState } from './store'
import { useEffect } from 'react'
import { me } from './store/user.slice'


const useUserState = () => {
  const token = useSelector<RootState, string | null>(state => state.user.token)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    if (token) {
      dispatch(me())
    }
  }, [token])

}



function App() {
  useUserState()
  return (
    <div>
      <Navbar />
      <hr className='my-4' />
      <AppRouter />
    </div>
  )
}

export default App
