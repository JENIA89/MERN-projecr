import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import AddEditTour from 'pages/AddEditTour'
import Home from 'pages/Home'
import Login from 'pages/Login'
import Register from 'pages/Register'
import Tour from 'pages/Tour'
import Dashboard from 'pages/Dashboard'
import PrivateRoute from 'components/PrivateRoute'
import NotFound from 'pages/NotFound'


const AppRouter: FC = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/tours/search' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard'
       element={
        <PrivateRoute>
          <Dashboard/>
        </PrivateRoute>
      }/>
      <Route path='/addTour' element={<AddEditTour/>}/>
      <Route path='/editTour/:id'
        element={
          <PrivateRoute>
            <AddEditTour/>
          </PrivateRoute>
        }/>
      <Route path='/tour/:id'
        element={
          <PrivateRoute>
            <Tour/>
          </PrivateRoute>
        }/>
      <Route path='*' element={<NotFound/>}/>  
    </Routes>
  )
}

export default AppRouter