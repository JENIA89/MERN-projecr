import React, { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography
} from 'mdb-react-ui-kit';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getTours, setCurrentPage } from '../../redux/reducers/tourSlice';
import CardTour from '../../components/CardTour';
import Spinner from '../../components/Spinner';
import Pagination from 'components/Pagination';
import * as S from './styled';

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home: FC = (): JSX.Element => {
  const { tours, currentPage, numberOfPages, isLoading}  = useAppSelector(state => ({...state.tour}))
  const dispatch = useAppDispatch();
  const query = useQuery();
  const searchQuery = query.get('searchQuery');
  const location = useLocation()

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
        {tours.length === 0 && location.pathname === '/' && (
            <MDBTypography className='text-center mb-0' tag='h2'>
              No Tours Found
            </MDBTypography>
        )}
        {tours.length === 0 && location.pathname !== "/" && (
          <MDBTypography className="text-center mb-0" tag="h2">
            We couldn't find any matches for "{searchQuery}"
          </MDBTypography>
        )}
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
      {tours.length > 0 && (
        <Pagination
        // @ts-ignore
        setCurrentPage={setCurrentPage}
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        dispatch={dispatch}
      />
      )}
    </S.HomeContainer>
  )
}

export default Home