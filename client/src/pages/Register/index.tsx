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
import { IRegisterModel } from 'models';
import { register } from 'redux/reducers/authSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { toast } from 'react-toastify';

const initialState: IRegisterModel = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const Register: FC = (): JSX.Element => {
  const [ formValue, setFormValue ] = useState(initialState);
  const { isLoading, error } = useAppSelector((state) => ({...state.auth}));
  const { email, password, confirmPassword, firstName, lastName } = formValue;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error)
  }, [error])
  

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      return toast.error('Password should match')
    }

    if(email && password && confirmPassword && firstName && lastName) {
      // @ts-ignore
      dispatch(register({formValue, navigate}));
    }
  }

  const onInputChange = (e: any): void  => {
    const { name, value } = e.target;
    setFormValue({...formValue, [name]: value});
  }

  return (
    <S.RegisterContainer>
      <MDBCard alignment='left'>
        <MDBIcon fas  icon='user-circle' className='fa-2x'/>
        <h5>Sign Up</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
            <div className="col-md-6">
              <MDBInput 
                label='First Name'
                type='text'
                name='firstName'
                value={firstName}
                onChange={onInputChange}
                required  
                // @ts-ignore
                invalid='true'
                validation="Please provide First Name"
              />
            </div>
            <div className="col-md-6">
              <MDBInput 
                label='Last Name'
                type='text'
                name='lastName'
                value={lastName}
                onChange={onInputChange}
                required  
                // @ts-ignore
                invalid='true'
                validation="Please provide Last Name"
              />
            </div>
            <div className="col-md-12">
              <MDBInput 
                label='email'
                type='email'
                name='email'
                value={email}
                onChange={onInputChange}
                required  
                // @ts-ignore
                invalid='true'
                validation="Please provide email"
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
                invalid='true'
                validation="Please provide password"
              />
            </div>
            <div className="col-md-12">
              <MDBInput 
                label='password confirm'
                type='password'
                name='confirmPassword'
                value={confirmPassword}
                onChange={onInputChange}
                required
                // @ts-ignore
                invalid='true'
                validation="Please provide confirmPassword"
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{width: '100%'}} className='mt-2'>
                {isLoading && <MDBSpinner className='me-2' tag='span' size='sm' role='status' />}
                Register
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to='/login'>
            Alredy have an account? Sing In
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </S.RegisterContainer>
    
  )
}

export default Register