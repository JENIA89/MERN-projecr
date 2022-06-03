import React, { useEffect, FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as S from './styled';
import {
  MDBBtn,
  MDBCard,
  MDBIcon,
  MDBCardBody,
  MDBCardFooter,
  MDBInput,
  MDBSpinner,
  MDBValidation
} from 'mdb-react-ui-kit';
import { ILoginModel } from 'models';
import { login } from 'redux/reducers/authSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { toast } from 'react-toastify';

const initialState: ILoginModel = {
  email: '',
  password: '',
}

const Login: FC = (): JSX.Element => {
  const [ formValue, setFormValue ] = useState(initialState);
  const { isLoading, error } = useAppSelector((state) => ({...state.auth}));
  const { email, password } = formValue;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error)
  }, [error])
  

  const handleSubmit = (e: React.SyntheticEvent): void  => {
    e.preventDefault();
    if(email && password) {
      // @ts-ignore
      dispatch(login({formValue, navigate}));
    }
  }

  const onInputChange = (e: any): void  => {
    const { name, value } = e.target;
    setFormValue({...formValue, [name]: value});
  }

  return (
    <S.LoginContainer>
      <MDBCard alignment='left'>
        <MDBIcon fas  icon='user-circle' className='fa-2x'/>
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
            <div className="col-md-12">
              <MDBInput 
                label='email'
                type='email'
                name='email'
                value={email}
                onChange={onInputChange}
                required  
                // @ts-ignore
                invalid
                validation="Please provide your email"
              />
            </div>
            <div className="col-md-12">
              <MDBInput 
                label='password'
                type='password'
                name='password'
                value={password}
                onChange={onInputChange}
                required
                // @ts-ignore
                invalid
                validation="Please provide your password"
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{width: '100%'}} className='mt-2'>
                {isLoading && <MDBSpinner className='me-2' tag='span' size='sm' role='status' />}
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to='/register'>
            Don't have account? Sing Up
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </S.LoginContainer>
    
  )
}

export default Login
