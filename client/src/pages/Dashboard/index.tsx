import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { deleteTour, getToursByUser } from '../../redux/reducers/tourSlice';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBIcon,
  MDBRow
} from 'mdb-react-ui-kit';
import { excerpt } from '../../utils/strUtils';
import Spinner from '../../components/Spinner';
import * as S from './styled';

const Dashboard: FC = (): JSX.Element => {
  const { user } = useAppSelector(state => ({...state.auth}));
  const { userTours, isLoading } = useAppSelector(state => ({...state.tour}));
  const dispatch = useAppDispatch();
  const userId: string | undefined = user?.result?._id;
  
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
      {userTours.length === 0 ? (
        <S.NoAvailable>No tour available with user: {user?.result?.name}</S.NoAvailable>
      ) : (
        <>
        <S.UserNameTitle>Dashboard: {user?.result?.name}</S.UserNameTitle>
        <S.Line/>
        </>
      )}
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
                      {excerpt(userTour.description, 40)}
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