import React, { FC } from 'react';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from 'components/Header/Header';
import AppRouter from './router';


const App: FC = (): JSX.Element => {
  return (
    <div className='App'>
      <Header/>
      <ToastContainer/>
      <AppRouter/>
    </div>
  )
}

export default App;
