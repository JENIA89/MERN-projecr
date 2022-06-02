import React, { FC, useState } from 'react';
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
import { useAppDispatch } from 'hooks/redux';

const initialState: ILoginModel = {
  email: '',
  password: ''
}

const Login: FC = (): JSX.Element => {
  const [ formValue, setFormValue ] = useState<typeof initialState>(initialState);
  const { email, password } = formValue;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent): void  => {
    e.preventDefault();
    if(email && password) {
      dispatch(login(formValue));
    }
    navigate('/');
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
          <MDBValidation onSubmit={handleSubmit}  className='row g-3'>
            <div className="col-md-12">
              <MDBInput 
                label='email'
                type='email'
                name='email'
                value={email}
                onChange={onInputChange}
                required
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
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{width: '100%'}} className='mt-2'>
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