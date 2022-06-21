import React, { FC } from 'react'
import { MDBCard, MDBCardBody, MDBCardGroup, MDBCardImage, MDBCardText, MDBCardTitle } from 'mdb-react-ui-kit';
import { excerpt } from 'utils';
import { Link } from 'react-router-dom';

interface CardTourProps {
  title: string;
  description: string;
  name: string;
  imageFile: string;
  tags: Array<string>;
  _id: string;
}

const CardTour: FC<CardTourProps> = ({title, description, imageFile, name, tags, _id}): JSX.Element => {
  return (
    <MDBCardGroup>
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{maxWidth: '20rem'}}>
        <MDBCardImage
          src={imageFile}
          alt={title}
          position='top'
          style={{maxWidth: '100%', height: '180px'}}
        />
        <div className="top-left">{name}</div>
        <span className="span text-start tag-card">
          {tags.map(tag =>`#${tag}`)}
        </span>
        <MDBCardBody>
          <MDBCardTitle className='test-start'>{title}</MDBCardTitle>
          <MDBCardText className='test-start'>
            {excerpt(description)}
            <Link to={`/tour/${_id}`}>
              Read More
            </Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  )
}

export default CardTour