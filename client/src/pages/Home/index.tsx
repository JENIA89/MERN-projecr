import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import * as S from './styled';
import { getTours } from 'redux/reducers/tourSlice';
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import CardTour from 'components/CardTour/CardTour';

const Home: FC = (): JSX.Element => {
  const { tours, isLoading}  = useAppSelector(state => ({...state.tour}))
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTours())
  }, []);

  if(isLoading) {
    return <h2>Loadig...</h2>
  }
  
  return (
    <S.HomeContainer>
      <MDBRow className='mt-5'>
        {
          !tours.length && (
            <MDBTypography className='text-center mb-0' tag='h2'>
              No Tours Found
            </MDBTypography>
          )
        }
        <MDBCol>
          <MDBContainer>
            <MDBRow className='row-cols-1 row-cols-md-3 g-2'>
              {tours && tours.map((tour) => (
                <CardTour key={tour._id} {...tour}/>
              ))}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </S.HomeContainer>
  )
}

export default Home