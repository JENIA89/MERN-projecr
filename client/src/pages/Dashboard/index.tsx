import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { deleteTour, getToursByUser } from '../../redux/reducers/tourSlice';
import * as S from './styled';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardGroup, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import { excerpt } from '../../utils';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const Dashboard = () => {
  const { user } = useAppSelector(state => ({...state.auth}));
  const { userTours, isLoading } = useAppSelector(state => ({...state.tour}));
  const dispatch = useAppDispatch();
  const userId = user?.result?._id;
  
  useEffect(() => {
    if(userId) {
      // @ts-ignore
      dispatch(getToursByUser(userId))
    }
  }, [userId])

  const handleDelete = (id: any): void => {
    if(window.confirm('Are you sure you want to delete this tour?')) {
      // @ts-ignore
      dispatch(deleteTour(id))
    }
  }

  if(isLoading) {
    return <Spinner />
  }
  
  return (
    <S.DashboardContainer>
      <S.UserNameTitle>Dashboard: {user?.result?.name}</S.UserNameTitle>
      <S.Line/>
      {userTours && userTours.map(userTour => (
        <MDBCardGroup key={userTour._id}>
          <MDBCard style={{width: '600px'}} className='mt-2'>
            <MDBRow className='g-0'>
              <MDBCol md='4'>
                <MDBCardImage
                  className='rounded'
                  src={userTour.imageFile}
                  alt={userTour.title}
                  fluid
                />
              </MDBCol>
              <MDBCol md='8'>
                <MDBCardBody>
                  <MDBCardTitle className='text-start'>
                    {userTour.title}
                  </MDBCardTitle>
                  <MDBCardText className='text-start'>
                    <small className='text-muted'>
                      {excerpt(userTour.description)}
                    </small>
                  </MDBCardText>
                  <S.Button>
                    <MDBBtn className='mt-1' tag='a' color='none'>
                      <MDBIcon
                        fas
                        icon='trash'
                        size='lg'
                        style={{color: '#dd4b39'}}
                        onClick={() => handleDelete(userTour._id)}
                      />
                    </MDBBtn>
                    <Link to={`/editTour/${userTour._id}`}>
                    <MDBIcon
                        fas
                        icon='edit'
                        size='lg'
                        style={{color: '#55acee', marginLeft: '10px'}}
                      />
                    </Link>
                  </S.Button>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCardGroup>
      ))}
    </S.DashboardContainer>
  )
}

export default Dashboard