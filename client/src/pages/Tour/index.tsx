import React, { FC, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import DisqusThread from 'components/DisqusThread';
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBContainer,
  MDBIcon
} from 'mdb-react-ui-kit';
import { getTour } from 'redux/reducers/tourSlice';
import * as S from './styled';

const Tour: FC = (): JSX.Element => {
  const { tour } = useAppSelector(state => ({...state.tour}));
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    // @ts-ignore
    if(id) dispatch(getTour(id))
  }, [id])
  
  return (
    <>
    <MDBContainer>
      <MDBCard>
        <MDBCardImage
          src={tour?.imageFile}
          alt={tour?.title}
          position='top'
          style={{maxWidth: '100%', height: '600px'}}
        />
        <MDBCardBody>
          <MDBBtn
          tag='a'
          color='none'
          style={{float: 'left', color: '#000'}}
          onClick={() => navigate('/')}
          >
            <MDBIcon
              fas
              size='lg'
              icon='long-arrow-alt-left'
              style={{float: 'left'}}
            />
          </MDBBtn>
          <S.TourTitle>{tour?.title}</S.TourTitle>
          <S.TourSpan>
            <S.TourCreateBy>Create By: {tour?.name}</S.TourCreateBy>
          </S.TourSpan>
          <S.TourTags> 
              {tour.tags && tour.tags.map((tag: string)=>` #${tag}`)}
          </S.TourTags>
          <MDBCardText className='text-start mt-2'>
            <MDBIcon
              style={{float: 'left', margin: '5px'}}
              far
              icon='calendar-alt'
              size='lg'
              />
            <S.TourDate className="text-muted">
              {moment(tour?.createdAt).fromNow()}
            </S.TourDate>
          </MDBCardText>
          <MDBCardText className='lead mb-0 text-start'>
            {tour?.description}
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
      <DisqusThread id={id} title={tour.title} path={`/tour/${id}`}/>
    </MDBContainer>
    </>
  )
}

export default Tour