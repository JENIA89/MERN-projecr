import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { useNavigate, useParams } from 'react-router-dom';
import { getToursByTag } from 'redux/reducers/tourSlice';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBRow
} from 'mdb-react-ui-kit';
import { excerpt } from 'utils/strUtils';
import Spinner from 'components/Spinner';
import * as S from './styled';

const TagTours: FC = (): JSX.Element => {
  const { tagTours, isLoading } = useAppSelector(state => ({...state.tour}))
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { tag } = useParams();

  useEffect(() => {
    if(tag) {
      // @ts-ignore
      dispatch(getToursByTag(tag))
    }
  }, [tag])
  
  if(isLoading) {
    return <Spinner />
  }

  return (
    <S.TagsContainer>
      <S.TagsTitle>Tours with tags: {tag}</S.TagsTitle>
      <S.Line />
      {tagTours && tagTours.map(tagTour => (
        <MDBCardGroup key={tagTour._id}>
          <MDBCard style={{maxWidth: '600px'}} className='mt-2'>
            <MDBRow className='g-0'>
              <MDBCol md='4'>
                <MDBCardImage
                  width='100%'
                  className='rounded'
                  src={tagTour.imageFile}
                  alt={tagTour.title}
                  />
              </MDBCol>
              <MDBCol md='8'>
                <MDBCardBody>
                  <MDBCardTitle className='text-start'>
                    {tagTour.title}
                  </MDBCardTitle>
                  <MDBCardText className='text-start'>
                    {excerpt(tagTour.description, 40)}
                  </MDBCardText>
                  <S.TagsButton>
                    <MDBBtn
                      size='sm' 
                      rounded
                      color='info'
                      onClick={()=> navigate(`/tour/${tagTour._id}`)}
                      >
                      Read More
                    </MDBBtn>
                  </S.TagsButton>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCardGroup>
      ))}
    </S.TagsContainer>
  )
}

export default TagTours