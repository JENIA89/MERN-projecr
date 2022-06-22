import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { MDBBtn, MDBCard, MDBCardBody, MDBValidation } from 'mdb-react-ui-kit';
// @ts-ignore
import FileBase from 'react-file-base64';
import * as S from './styled';
import { ITour } from '../../models';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toast } from 'react-toastify';
import { createTour, updateTour } from '../../redux/reducers/tourSlice';


const initialState: ITour = {
  title: '',
  description: '',
  tags: [],
  imageFile: ''
}
const AddEditTour:FC = () => {
  const [ tourData, setTourData ] = useState(initialState);
  const { title, description, tags } = tourData;
  const { error, userTours } = useAppSelector((state) => ({...state.tour}));
  const { user } = useAppSelector((state) => ({...state.auth}));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if(id) {
      const editTour = userTours.find(tour => tour._id === id);
      setTourData({...editTour} as ITour)
    }
  }, [id])

  useEffect(() => {
    error && toast.error(error);
  }, [error])

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if(title && description && tags) {
      const updateTourData = {...tourData, name: user?.result?.name};
      if(!id) {
        // @ts-ignore       
        dispatch(createTour({updateTourData, navigate}));
      } else {
        console.log(id, 'userId');
        console.log(updateTourData, 'data updateTour');
        // @ts-ignore
        dispatch(updateTour({id, updateTourData, navigate}));
      }
      handleClear();
    }
  }
  const onInputChange = (e: any) => {
    const { name, value } = e.target;
    setTourData({...tourData, [name]: value})
  }

  const handleAddTag = (tag: any) => {
    setTourData({...tourData, tags: [...tourData.tags, tag]})
  }
  const handleDeleteTag = (delTag: any) => {
    setTourData({...tourData, tags: tourData.tags.filter(tag => tag !== delTag)})
  }
  const handleClear = () => {
    setTourData({
      title: '',
      description: '',
      tags: [],
      imageFile: ''
    })
  }
  
  return (
    <S.TourContainer>
      <MDBCard alignment='center'>
        <S.TourTitle>{ id ? 'Update Tour' : 'Add Tour' }</S.TourTitle>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className='row g-3' noValidate>
            <div className="col-md-12">
              <input
                placeholder='title'
                type='text'
                value={title || ''}
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
                // @ts-ignore
                type='text'
                textarea={description.toString()}
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
                // @ts-ignore
                name='tags'
                variant='outlined'
                laceholder='tags'
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
            </div>
            <S.FileBaseContainer>
              <FileBase
                type='file'
                multiple={false}
                onDone={({base64}: any) => setTourData({...tourData, imageFile: base64})}
                />
            </S.FileBaseContainer>
            <div className="col-12">
              <MDBBtn style={{width: '100%'}}>{ id ? 'Update' : 'Submit' }</MDBBtn>
              <MDBBtn
                style={{width: '100%'}}
                className='mt-2'
                color='danger' 
                onClick={handleClear}
                >
                  Clear
                </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </S.TourContainer>
  )
}

export default AddEditTour