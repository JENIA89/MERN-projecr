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

const Header: FC = (): JSX.Element => {
  const [isShow, setIsShow] = useState<boolean>(false)
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
            <MDBNavbarItem>
              <MDBNavbarLink href='/'>
                <S.HeaderLink>Home</S.HeaderLink>
              </MDBNavbarLink>
            </MDBNavbarItem>
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
                <S.HeaderLink>Logout</S.HeaderLink>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/login'>
                <S.HeaderLink>Login</S.HeaderLink>
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  )
}

export default Header