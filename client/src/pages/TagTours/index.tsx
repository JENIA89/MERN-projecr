import React, { FC, useEffect } from 'react'
import Spinner from 'components/Spinner';
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { useNavigate, useParams } from 'react-router-dom';
import { getToursByTag } from 'redux/reducers/tourSlice';
import * as S from './styled';
import { MDBCard, MDBCardGroup, MDBCardImage, MDBCol, MDBRow } from 'mdb-react-ui-kit';

const TagTours: FC = () => {
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
      <S.TagsTitle>Tousr with tags: {tag}</S.TagsTitle>
      <S.Line />
      {tagTours && tagTours.map(tagTour => (
        <MDBCardGroup key={tagTour._id}>
          <MDBCard style={{maxWidth: '600px'}} className='mt-2'>
            <MDBRow className='g-0'>
              <MDBCol md='4'>
                <MDBCardImage
                  className='rounded'
                  src={tagTour.imageFile}
                  alt={tagTour.title}
                  />
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCardGroup>
      ))}
    </S.TagsContainer>
  )
}

export default TagTours