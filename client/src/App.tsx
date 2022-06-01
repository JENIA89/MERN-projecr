import React, { FC } from 'react';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AppRouter from './router';


const App: FC = (): JSX.Element => {
  return (
    <div className='App'>
      <ToastContainer/>
      <AppRouter/>
    </div>
  )
}

export default App;
