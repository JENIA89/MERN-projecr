import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import AddEditTour from 'pages/AddEditTour'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'


const AppRouter: FC = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/addTour' element={<AddEditTour/>}/>
      <Route path='/addTour/:id' element={<AddEditTour/>}/>
    </Routes>
  )
}

export default AppRouter