import DisqusThread from 'components/DisqusThread';
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBContainer, MDBIcon } from 'mdb-react-ui-kit';
import moment from 'moment';
import React, { FC, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getTour } from 'redux/reducers/tourSlice';

const Tour: FC = () => {
  const dispatch = useAppDispatch();
  const { tour } = useAppSelector(state => ({...state.tour}));
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
          <h3>{tour?.title}</h3>
          <span>
            <p className="text-start tourName">Create By: {tour?.name}</p>
          </span>
          <div style={{float: 'left'}}> 
            <span className="text-start">
              {tour.tags && tour.tags.map((tag: string)=>`#${tag}`)}
            </span>
          </div>
          <br/>
          <MDBCardText className='text-start mt-2'>
            <MDBIcon
              style={{float: 'left', margin: '5px'}}
              far
              icon='calendar-alt'
              size='lg'
              />
            <small className="text-muted">
              {moment(tour?.createdAt).fromNow()}
            </small>
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