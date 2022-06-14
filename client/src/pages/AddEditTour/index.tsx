import React, { FC, useState } from 'react';
import ChipInput from 'material-ui-chip-input';
import { MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBValidation } from 'mdb-react-ui-kit';
// @ts-ignore
import FileBase64 from 'react-file-base64'
import * as S from './styled';

interface IAddEditTour {
  title: string,
  description: string,
  tags: Array<any>,
  imageFile: any
}

const initialState: IAddEditTour = {
  title: '',
  description: '',
  tags: [],
  imageFile: ''
}
const AddEditTour:FC = () => {
  const [tourData, setTourData] = useState(initialState);
  const {title, description, tags} = tourData;

  const handleSubmit = () => {}
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
  const handleClear = () => {}
  
  return (
    <S.TourContainer>
      <MDBCard alignment='center'>
        <S.TourTitle>Add Tour</S.TourTitle>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className='row g-3' noValidate>
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
              <FileBase64
                type='file'
                multiple={false}
                onDone={({baze64}: any) => setTourData({...tourData, imageFile: baze64})}
                />
            </S.FileBaseContainer>
            <div className="col-12">
              <MDBBtn style={{width: '100%'}}>Submit</MDBBtn>
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