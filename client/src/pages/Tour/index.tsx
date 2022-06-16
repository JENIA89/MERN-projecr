import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { MDBCard, MDBCardBody, MDBCardImage, MDBContainer } from 'mdb-react-ui-kit';
import React, { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getTour } from 'redux/reducers/tourSlice';

const Tour: FC = () => {
  const dispatch = useAppDispatch();
  const { tour } = useAppSelector(state => ({...state.tour}));
  const {id} = useParams();

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
          <h3>{tour?.title}</h3>
          <span>
            <p className="text-start tourName">Create By: {tour?.name}</p>
          </span>
          <div style={{float: 'left'}}> 

          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    </>
  )
}

export default Tour