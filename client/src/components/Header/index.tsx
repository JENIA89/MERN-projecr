import React, { FC, SyntheticEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarNav,
  MDBNavbarToggler,
} from 'mdb-react-ui-kit';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setLogout } from 'redux/reducers/authSlice';
import { searchTours } from 'redux/reducers/tourSlice';
import * as S from './styled';
import decode from 'jwt-decode';

const Header: FC = (): JSX.Element => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = user?.token;

  if(token) {
    const decodedToken: any = decode(token);
    if(decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    if(search) {
      // @ts-ignore 
      dispatch(searchTours(search));
      navigate(`/tours/search?searchQuery=${search}`)
    } else {
      navigate('/');
    }
    setSearch('')
  }
  const handleLogout = (): void => {
    dispatch(setLogout())
  }
  
  return (
    <MDBNavbar style={{backgroundColor: '#f0e6ea'}} fixed='top' expand='lg'>
      <MDBContainer>
        <MDBNavbarBrand style={{color: '#606080', fontWeight: '600', fontSize: '22px'}}>
          Touropedia
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          aria-label='Toogle navigation'
          style={{color: '#606080'}}
          onClick={()=>setIsShow(!isShow)}
          >
            <MDBIcon icon='bars' fas/>
        </MDBNavbarToggler>
        <MDBCollapse show={isShow} navbar>
          <MDBNavbarNav right fullWidth={false} className='mb-2  mb-lg-0'>
            {user && <S.UserName>Logget as: {user?.result?.name}</S.UserName>}
            <MDBNavbarItem>
              <Link to='/'>
                <S.HeaderLink>Home</S.HeaderLink>
              </Link>
            </MDBNavbarItem>
            {user
            ? 
              <>
              <MDBNavbarItem>
                <Link to='/addtour'>
                  <S.HeaderLink>Add Tour</S.HeaderLink>
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <Link to='/dashboard'>
                  <S.HeaderLink>Dashboard</S.HeaderLink>
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <Link to='/login'>
                  <S.HeaderLink onClick={handleLogout}>Logout</S.HeaderLink>
                </Link> 
              </MDBNavbarItem>
              </>
            : 
              <>
              <MDBNavbarItem>
                <Link to='/login'>
                  <S.HeaderLink>Login</S.HeaderLink>
                </Link>
              </MDBNavbarItem>
              </>
            }
          </MDBNavbarNav>
          <form className='d-flex input-group w-auto' onSubmit={handleSubmit}>
            <input
              type='text'
              className='form-control'
              placeholder='Search Tour'
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <S.SearchIcon>
              <MDBIcon fas icon='search'/>
            </S.SearchIcon>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  )
}

export default Header