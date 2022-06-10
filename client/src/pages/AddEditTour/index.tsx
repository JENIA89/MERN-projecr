import ChipInput from 'material-ui-chip-input';
import { MDBCard, MDBIcon, MDBValidation } from 'mdb-react-ui-kit';
import React, { FC, useState } from 'react';
import * as S from './styled';

const initialState = {
  title: '',
  description: '',
  tags: [],
}
const AddEditTour:FC = () => {
  const [tourData, setTourData] = useState(initialState);
  const {title, description, tags} = tourData;

  const onInputChange = () => {

  }
  return (
    <S.TourContainer>
      <MDBCard alignment='center'>
        <S.TourTitle>Add Tour</S.TourTitle>
        <MDBValidation>
          <div className="col-md-12">
            <input
              placeholder='title'
              type='text'
              value={title}
              name='title'
              onChange={onInputChange}
              className='form-control'
              required  
              // @ts-ignore
              invalid='true'
              validation="Please provide title"
            />
          </div>
          <div className="col-md-12">
            <textarea
              placeholder='description'
              style={{height: '100px'}}
              value={description}
              name='description'
              onChange={onInputChange}
              className='form-control'
              required  
              // @ts-ignore
              invalid='true'
              validation="Please provide description"
            />
          </div>
          <div className="col-md-12">
            <ChipInput
              name='tags'
              variant='outlined'
              laceholder='tags'
              value={tags}
            />
          </div>
        </MDBValidation>
      </MDBCard>
    </S.TourContainer>
  )
}

export default AddEditTour