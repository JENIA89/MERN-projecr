import React, { FC } from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardGroup, MDBCardImage, MDBCardText, MDBCardTitle, MDBIcon, MDBTooltip } from 'mdb-react-ui-kit';
import { excerpt } from 'utils';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { likeTour } from 'redux/reducers/tourSlice';

interface CardTourProps {
  title: string;
  description: string;
  name: string;
  imageFile: string;
  tags: Array<string>;
  _id: string;
  likes: Array<string>;
}

const CardTour: FC<CardTourProps> = ({title, description, imageFile, name, tags, _id, likes}): JSX.Element => {

  const { user } = useAppSelector(state => ({...state.auth}));
  const dispatch = useAppDispatch();
  const userId = user?.result._id;


  const Likes = () => {
    if(likes.length > 0) {
      return likes.find(like => like === userId) ? (
        <>
          <MDBIcon fas icon='thumbs-up' />
          &nbsp;
          {likes.length > 2 ? (
            <MDBTooltip
              tag='a'
              title={`You and ${likes.length - 1} other people likes`}
            >
              {likes.length} Likes
            </MDBTooltip>
          ) : (
            `${likes.length} Like${likes.length > 1 ? 's' : ''}`
          )}
        </>
      ) : (
        <>
          <MDBIcon far icon='thumbs-up' />
          &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
        </>
      )
    }
    return(
      <>
        <MDBIcon far icon='thumbs-up' />
        &nbsp;Like
      </>
    )
  }
  const handleLike = () => {
    // @ts-ignore
    dispatch(likeTour({_id}))
  }
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
          {tags.map((tag, i) => (
            <Link key={i} to={`/tours/tag/${tag}`}>#{tag} </Link>
          ))}
          <MDBBtn
            style={{float: 'right'}}
            tag='a'
            color='none'
            // @ts-ignore
            onClick={!user?.result ? null : handleLike}
            >
              {!user?.result ? (
                <MDBTooltip tag='a' title='Please login to like tour'>
                  <Likes />
                </MDBTooltip>
              ) : (
                <Likes />
              )}
            </MDBBtn>
        </span>
        <MDBCardBody>
          <MDBCardTitle className='test-start'>{title}</MDBCardTitle>
          <MDBCardText className='test-start'>
            {excerpt(description, 40)}
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