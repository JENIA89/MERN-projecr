import React, { FC, useState } from 'react';
import {
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBNavbarToggler,
} from 'mdb-react-ui-kit';
import * as S from './styled';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setLogout } from 'redux/reducers/authSlice';
import { searchTours } from 'redux/reducers/tourSlice';
import { useNavigate } from 'react-router-dom';

const Header: FC = (): JSX.Element => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
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
  const handleLogout = () => {
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
              <MDBNavbarLink href='/'>
                <S.HeaderLink>Home</S.HeaderLink>
              </MDBNavbarLink>
            </MDBNavbarItem>
            {user
            ? 
              <>
              <MDBNavbarItem>
              <MDBNavbarLink href='/addtour'>
                <S.HeaderLink>Add Tour</S.HeaderLink>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/dashboard'>
                <S.HeaderLink>Dashboard</S.HeaderLink>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/login'>
                <S.HeaderLink onClick={handleLogout}>Logout</S.HeaderLink>
              </MDBNavbarLink>
            </MDBNavbarItem>
              </>
            : <>
            <MDBNavbarItem>
              <MDBNavbarLink href='/login'>
                <S.HeaderLink>Login</S.HeaderLink>
              </MDBNavbarLink>
            </MDBNavbarItem></>
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