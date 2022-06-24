import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import * as S from './styled';
import { getTours, setCurrentPage } from '../../redux/reducers/tourSlice';
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import CardTour from '../../components/CardTour';
import Spinner from '../../components/Spinner';
import Pagination from 'components/Pagination';

const Home: FC = (): JSX.Element => {
  const { tours, currentPage, numberOfPages, isLoading}  = useAppSelector(state => ({...state.tour}))
  const dispatch = useAppDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(getTours(currentPage))
  }, [currentPage]);

  if(isLoading) {
    return <Spinner />
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
      <Pagination
        // @ts-ignore
        setCurrentPage={setCurrentPage}
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        dispatch={dispatch}
      />
    </S.HomeContainer>
  )
}

export default Home